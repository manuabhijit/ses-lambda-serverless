import { SesMails } from './../app/ses-mails';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { SES_LIST_PASSWORD } from '../config/ses-password.config';

export const h01ListVerifiedEmailsHandler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  let sesPassword = !!event.queryStringParameters.sespassword ? event.queryStringParameters.sespassword : null;

  if(sesPassword !== SES_LIST_PASSWORD){
    let response = {
      statusCode: 401,
      body: JSON.stringify({error : {message: "You are un-authorized"}}),
    };
    cb(null, response); 
  }
  else{
    new SesMails().list().then(data => {
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