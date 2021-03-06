'use strict';
var Q = require("q");
var authHelper = require('../helpers/auth-helper');
var outlook = require('node-outlook');

var myuser = {};

//GET /event operationId
module.exports.getEvents = (event, callback) => {

	myuser.email = event.queryStringParameters.user + '@' + event.queryStringParameters.tenant + '.onmicrosoft.com';

	authHelper.getToken(event.queryStringParameters.clientId, event.queryStringParameters.clientSecret, event.queryStringParameters.tenant)
		.then((token) => {
      console.log("token!!!!!!!!!!!!!!!!!");
      console.log(token);
			return getEvents(token);
  	})
		.then((events) => {
      callback(null, JSON.stringify({ events: events }));
  	})
    .catch((error) => {
      callback(error, null);
    });
}

//GET /event operationId
module.exports.getOneEvent = (event, callback) => {

  myuser.email = event.queryStringParameters.user + '@' + event.queryStringParameters.tenant + '.onmicrosoft.com';

  authHelper.getToken(event.queryStringParameters.clientId, event.queryStringParameters.clientSecret, event.queryStringParameters.tenant)
    .then((token) => {
      return getOneEvent(token, event.pathParameters.id);
    })
    .then((event) => {
      callback(null, JSON.stringify({ event: event }));
    })
    .catch((error) => {
      callback(error, null);
    });
}

var getEvents = function(token) {

	var d = Q.defer();

  // Set up oData parameters
  var queryParams = {
    '$select': 'Subject,Start,End,Attendees',
    '$orderby': 'Start/DateTime desc',
    // '$top': 10
  };

  // Set the API endpoint to use the v2.0 endpoint
  outlook.base.setApiEndpoint('https://graph.microsoft.com/v1.0');
  // Set the anchor mailbox to the user's SMTP address
  outlook.base.setAnchorMailbox(myuser.email);

  console.log("before getEvents")
  console.log(JSON.stringify({user: myuser, token: token.token.access_token, odataParams: queryParams}));

  outlook.calendar.getEvents({user: myuser, token: token.token.access_token, odataParams: queryParams},
    function(error, result){
      if (error) {
        console.log('getEvents returned an error: ' + error);
        d.reject(new Error(error));
      } else if (result) {
        console.log('getEvents returned ' + result.value.length + ' events.');
        
        var events = [];

        result.value.forEach(function(event) {
          // console.log('  Subject: ' + event.subject);
          // console.log('  Event dump: ' + JSON.stringify(event));
          // console.log(JSON.stringify(event));
          var attendees = [];
          event.attendees.forEach(function(attendee) { 
            attendees.push({name : attendee.emailAddress.name, email : attendee.emailAddress.address});
          });
          events.push({id: event.id, subject : event.subject, start : event.start.dateTime, end : event.end.dateTime, attendees : attendees});
        });

        // console.log(events);

        d.resolve(events);
      }
    });

  return d.promise;
}



var getOneEvent = function(token, id) {

  var d = Q.defer();

  // Set up oData parameters
  var queryParams = {
    '$select': 'Subject,Start,End,Attendees'
  };

  // Set the API endpoint to use the v2.0 endpoint
  outlook.base.setApiEndpoint('https://graph.microsoft.com/v1.0');
  // Set the anchor mailbox to the user's SMTP address
  outlook.base.setAnchorMailbox(myuser.email);
console.log("getoneevent parameters!!");
console.log(JSON.stringify({user: myuser, token: token.token.access_token, eventId: id, odataParams: queryParams}));

  outlook.calendar.getEvent({user: myuser, token: token.token.access_token, eventId: id, odataParams: queryParams},
    function(error, result){
      if (error) {
        console.log('getEvent returned an error: ' + error);
        d.reject(new Error(error));
      } else if (result) {

        var attendees = [];
        result.attendees.forEach(function(attendee) { 
          attendees.push({name : attendee.emailAddress.name, email : attendee.emailAddress.address});
        });
        
        d.resolve({id: result.id, subject : result.subject, start : result.start.dateTime, end : result.end.dateTime, attendees : attendees});
      }
    });

  return d.promise;
}
