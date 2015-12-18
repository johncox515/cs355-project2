var express = require('express');
var router = express.Router();
var beerDal = require('../dal/beer_dal');
var breweryDal = require('../dal/brewery_dal');


/* return a table of all the companies and their addresses */
router.get('/', function(req, res){
    beerDal.GetAll(function(err, result){
        console.log(result);
        res.render('beer/beer_list', {rs: result});
    });
})


router.get('/create', function(req, res) {
    beerDal.GetAll(function(err, result) {
        res.render('beer/beer_create', {beer : result});
    });
});


/* return a drop down of all the address */
router.get('/edit', function(req, res) {
    var beer_id = req.query.id;
    console.log("beer_id: " + beer_id);
    beerDal.GetByID(beer_id, function(err, beer_results){

        if(err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving beer with id " + beer_id + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('beer/beer_edit', data);
        }
        else {
            breweryDal.GetAll(function(err, brewery_results) {

                console.log(beer_results);
                var data = {
                    beer: beer_results,
                    brewery: brewery_results
                };
                console.log("Data is: "+ data);
                res.render('beer/beer_edit', data);
            })
        }
    });

});

router.get('/save', function(req, res, next) {
    console.log("beer name equals: " + req.query.beername);
    console.log("abv submitted was: " + req.query.abv);
    console.log("the brewery id submitted was: " + req.query.breweryid);



    beerDal.Insert(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
})


router.get('/update', function(req, res, next) {


    beerDal.Update(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/delete', function(req, res) {
    console.log(req.query.id);

    beerDal.Delete(req.query.id, function(err, result) {
        res.send(req.query.name + ' was successfully deleted.');
    });
});

module.exports = router;

