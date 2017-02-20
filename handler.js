'use strict';

const eventHandler = require('./handlers/event');
const mailHandler = require('./handlers/mail');

function makeResponse(error, result) {
  const statusCode = error && error.statusCode || 200;
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Content-Type": "application/json"
    },
    body: result
  }
}


module.exports.getEvents = (event, context, callback) => {
  eventHandler.getEvents(event, (error, result) => {
    const response = makeResponse(error, result)
    context.succeed(response)
  });
};

module.exports.getOneEvent = (event, context, callback) => {
  eventHandler.getOneEvent(event, (error, result) => {
    const response = makeResponse(error, result)
    context.succeed(response)
  });
};

module.exports.getMails = (event, context, callback) => {
  mailHandler.getMails(event, (error, result) => {
    const response = makeResponse(error, result)
    context.succeed(response)
  });
};


