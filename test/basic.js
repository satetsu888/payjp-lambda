var assert = require('assert');
var nock = require("nock");

var api = nock("https://api.pay.jp/v1")
          .post("/charges")
          .reply(200, '{"result":"mocked response"}');

describe('basic',function(){
    it('Should create', function(testDone){
        var data = {
            amount: "3500",
            currency:'jpy',
            payjp_token: 'dummy'
        };
        var context = {
            invokeid: 'invokeid',
                succeed: function(message){
                    testDone();
                return;
            }
        };

        var lambda = require("../index.js");
        lambda.handler(data,context);
        assert(lambda);
    });
});
