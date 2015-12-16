var express = require('express');
var router = express.Router();
var breweryDal = require('../dal/brewery_dal');
//var addressDal = require('../dal/location_dal');


/* return a table of all the companies and their addresses */
router.get('/', function(req, res){
    breweryDal.GetAll(function(err, result){
        console.log(result);
        res.render('brewery/brewery_list', {rs: result});
    });
})

router.get('/AllBeers', function(req, res){
    breweryDal.GetAllBeers(function(err, result){
        console.log(result);
        res.render('brewery/beerandbrew_list', {rs: result});
    });
})


router.get('/create', function(req, res) {
    breweryDal.GetAll(function(err, result) {
        res.render('brewery/brewery_create', {address : result});
    });
});


/* return a drop down of all the address */
router.get('/edit', function(req, res) {
    var brewery_id = req.query.brewery_id;
    console.log("brewery_id: " + brewery_id);
    breweryDal.GetByID(brewery_id, function(err, brewery_results){

        if(err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving brewery with id " + brewery_id + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('brewery/brewery_edit', data);
        }
        else {
            breweryDal.GetAll(function(err, address_results) {

                console.log(brewery_results);
                var data = {
                    brewery: brewery_results,
                    address: address_results
                };
                console.log("Data is: "+ data);
                res.render('brewery/brewery_edit', data);
            })
        }
    });

});

router.get('/save', function(req, res) {
    console.log(req.query);

    breweryDal.Insert(req.query, function(err, result) {
        if(err) {
            res.send('Error adding new brewery.<br />' + err);
        }
        else {
            res.send('brewery Successfully Added');
        }
    });
})


router.get('/update', function(req, res, next) {
    console.log("brewery name equals: " + req.query.name);
    console.log("the brewery street submitted was: " + req.query.street);
    console.log("the brewery city submitted was: " + req.query.city);
    console.log("the brewery zip submitted was: " + req.query.zip);
    console.log("the brewery_id submitted was " + req.query.brewery_id);



    breweryDal.Update(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/delete', function(req, res) {
    console.log(req.query.brewery_id);

    breweryDal.Delete(req.query.brewery_id, function(err, result) {
        res.send(req.query.name + ' was successfully deleted.');
    });
});

module.exports = router;

