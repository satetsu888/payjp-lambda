var AWS = require("aws-sdk");
var request = require('request');
var config = require('./config.js');

AWS.config.update({region: config.aws.region});

exports.handler = function(event, context){

    var options = {
        uri: 'https://api.pay.jp/v1/charges',
        form: {
            amount: event.amount,
            currency: event.currency,
            card: event["payjp-token"]
        },
        json: true,
        auth: {
            user: config.payjp.user,
            pass: config.payjp.pass
        }
    };

    request.post(options, function(error, response, body){
        var api_response;
        if (!error && response.statusCode == 200) {
            api_response = JSON.stringify(body);
        } else {
            api_response = JSON.stringify(response);
        }

        context.done(api_response);
    });
}
