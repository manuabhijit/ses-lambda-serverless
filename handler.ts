import { SesMails } from './app/ses-mails';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  
  new SesMails().send({
    subject: "My Test Mail",
    mailBody: {html: "<h1>abc</h1>"},
    mailTo: { name: "Abhijit To", email: "abhijit@hastpa.org"},
    mailFrom: { name: "Abhijit From", email: "abhijit@hastpa.org"}
  }).then(data => {
    let response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
    cb(null, response);    
  }).catch(err => {
    let response = {
      statusCode: 200,
      body: JSON.stringify(err),
    };
    cb(null, response);    
    
  });
}
