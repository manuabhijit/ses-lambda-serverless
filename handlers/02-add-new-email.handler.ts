import { SesMails } from './../app/ses-mails';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { ADD_NEW_PASSWORD } from '../config/ses-password.config';

export const h02AddNewEmailHandler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  let sesPassword: string = !!event.queryStringParameters.sespassword ? event.queryStringParameters.sespassword : null;
  let email: string = !!event.queryStringParameters.email ? event.queryStringParameters.email : null;
  if(sesPassword !== ADD_NEW_PASSWORD){
    let response = {
      statusCode: 401,
      body: JSON.stringify({error : {message: "You are un-authorized"}}),
    };
    cb(null, response);
  }
  else if(!email){
    let response = {
      statusCode: 400,
      body: JSON.stringify({error : {message: "Please provide a valid email address"}}),
    };
    cb(null, response);
  }
  else{
    new SesMails().verify(email).then(data => {
      let response = {
        statusCode: 203,
        body: JSON.stringify(data),
      };
      cb(null, response);    
    })
    .catch(err => {
      let response = {
        statusCode: 400,
        body: JSON.stringify(err),
      };
      cb(null, response);    
    })
  }
}