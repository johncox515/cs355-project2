$( "#signupSubmit" ).submit(function( event ) {
    event.preventDefault();
    $.ajax({
            method: "GET",
            url: "/signup",
            data: $(this).serialize()
        })
        .fail(function () {
            // failure() is only triggered if there was an error submitting data to the
           // web server;
            // i.e. the server is offline or the URL we are trying to send data to doesn't
            exist (404)
            console.log('there was a failure.');
        })
        .success(function (response) {
            // if the web server successfully send backs a message the success() function
           // is run.
            console.log('submitted successfully');
            console.log(response);
        })
        .done(function (response) {
            // the done() function is run no matter if the request succeeded or failed.
        });

    $('#message').hide(); //hide any error messages from previous attempts
    $.ajax({
            method: "GET",
            url: "/signup",
            data: $(this).serialize()
        })
        .fail(function () {
            // failure() is only triggered if there was an error submitting data to the
            //web server;
            // i.e. the server is offline or the URL we are trying to send data to doesn't
            exist (404)
            $('#message').addClass("alert alert-danger");
            $('#message').html('there was a failure.');
            $('#message').show();
        })
        .success(function (response) {
            // if the web server successfully send backs a message the success() function
          //  is run.
            if(response.success) {
                $('#message').addClass("alert alert-success");
                $('#message').html('submitted successfully');
                $('#message').show();
                $("#userFormCreate").hide(); //hide the form
            }
            else {
                $('#message').addClass("alert alert-warning");
                $('#message').html('/saveUserAjax returned that an error occurred.<br />'
                    + response.error);
                $('#message').show();
                console.log('/saveUserAjax returned that an error occurred.');
            }
        })
        .done(function (response) {
            console.log(response);
        });
});