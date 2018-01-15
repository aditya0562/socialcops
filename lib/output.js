import logger from './logger';
import _ from 'lodash';

function Output() {}

/*
 * This method sends the response to the client.
 */
function sendResponse(res, status, body, file) {
  if(!res.headersSent) {
    if(body)
      return res.status(status).json(body);
    return res.status(status).send();
  }
  else {
    logger.error('Response already sent.');
  }
}

/*
 * These methods are called to respond to the API user with the information on
 * what is the result of the incomming request
 */
Output.success = (res, message) => {
  message = _.isString(message) ? { message } : message;
  return sendResponse(res, 200, message);
}

Output.created = (res, object) => {
  return sendResponse(res, 201, object);
}

Output.operationFailed = (res, reason) => {
  const status = reason.status;
  reason = reason.message || reason;
  return sendResponse(res, status || 400, {reason});
}

export default Output;
