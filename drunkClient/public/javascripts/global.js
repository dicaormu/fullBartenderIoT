// DOM Ready =============================================================
$(document).ready(function () {
    // Add User button click
    $('#btnAddCommand').on('click', addCommand);
    $('#btnRegisterToUrl').on('click', registerToURL);
});


function addCommand(event) {
    event.preventDefault();
    let beer = $('#addCommand fieldset input#inputBeerCommand').val();
    let beeramt = $('#addCommand fieldset input#inputBeerQty').val();
    let food = $('#addCommand fieldset input#inputFoodCommand').val();
    let foodamt = $('#addCommand fieldset input#inputFoodQty').val();

    let data = {food: {item:food ,amount:Number(foodamt)},beer: {item:beer ,amount:Number(beeramt)}};
    console.log("stingifyed: ",JSON.stringify(data));
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        url: '/addCommand',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON'
    }).done(function (response) {
        // Check for successful (blank) response
        if (response.msg === '') {
            console.log("OK")
        }
    });
}


function registerToURL(event) {
    event.preventDefault();
    let urlSend = $('#URLRegistry fieldset input#registrationUrl').val();
    console.log("registering url "+urlSend);
    let data = {urlSend : urlSend }
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        url: '/registerApi',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON'
    }).done(function (response) {
        // Check for successful (blank) response
        if (response.msg === '') {
            console.log("registered OK")
        }
    });
}

