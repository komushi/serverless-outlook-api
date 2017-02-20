'use strict';
var Q = require("q");
var authHelper = require('../helpers/auth-helper');
var outlook = require('node-outlook');

var myuser = {};

//GET /event operationId
module.exports.getMails = (event, callback) => {

	myuser.email = event.queryStringParameters.user + '@' + event.queryStringParameters.tenant + '.onmicrosoft.com';

	authHelper.getToken(event.queryStringParameters.clientId, event.queryStringParameters.clientSecret, event.queryStringParameters.tenant)
	.then((token) => {
			return getMails(token);
  	})
	.then((messages) => {
      callback(null, JSON.stringify({ mails: messages }));
  	})
    .catch((error) => {
      callback(error, null);
    });
}

var getMails = function(token) {

	var d = Q.defer();

	// Set up oData parameters
	var queryParams = {
	  '$select': 'Subject,ReceivedDateTime,From,IsRead',
	  '$orderby': 'ReceivedDateTime desc',
	  // '$top': 10
	};
	console.log(myuser);
	// Set the API endpoint to use the v2.0 endpoint
	outlook.base.setApiEndpoint('https://graph.microsoft.com/v1.0');
	// Set the anchor mailbox to the user's SMTP address
	outlook.base.setAnchorMailbox(myuser.email);

	outlook.mail.getMessages({user: myuser, token: token.token.access_token, folderId: 'inbox', odataParams: queryParams},
	  function(error, result){
	    if (error) {
	      console.log('getMessages returned an error: ' + error);
	      // response.write('<p>ERROR: ' + error + '</p>');
	      // response.end();
	      d.reject(new Error(error));
	    }
	    else if (result) {
	      console.log('getMessages returned ' + result.value.length + ' messages.');
	      console.log(result);

	      var messages = [];

	      result.value.forEach(function(message) {
	        console.log('  Subject: ' + message.subject);
	        var from = message.from ? message.from.emailAddress.name : 'NONE';
	        console.log('  From: ' + from);
	        console.log('  IsRead: ' + message.isRead);
	        messages.push({id: message.id, subject : message.subject, receivedOn :  message.receivedDateTime, from : from, read: message.isRead});
	      });

	      console.log(messages);

	      d.resolve(messages);
	    }
	  });

	return d.promise;
}