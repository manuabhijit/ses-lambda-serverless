import { TemplateRenderer } from './../app/mailing-templates/template-renderer';
import { JsonUtility } from './../utility/utility';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { MailingObject } from './../app/mail-body.interface';
import { SesMails } from './../app/ses-mails';
import { MailObjectValidator } from './../app/validators/mail-object.validator';
import { ValidatorResult } from 'jsonschema';

export const h03SendMailHandler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  let payload: any = {};

  JsonUtility.isJsonStringByPromise(event.body).then( _ => {
    console.log("Check 1: Payload was JSON.");
    payload = JSON.parse(event.body);
    return new MailObjectValidator().validate(payload).promise();
  })
  .then( _ => {
    console.log("Check 2: Payload was valid JSON.");
    let mailObject: MailingObject = payload;
    let templateRenderer: TemplateRenderer = new TemplateRenderer(mailObject.mailBody.template_id, mailObject.mailBody.replacements)
    mailObject.mailBody.html = templateRenderer.getHTML();
    mailObject.subject = templateRenderer.getSubject();
    //return Promise.resolve({a:9});
    return new SesMails().send(mailObject);
  })
  .then(sesResponse => {
    console.log("Check 3: Mail was sent");
    let response = {
      statusCode: 200,
      body: JSON.stringify(sesResponse),
    };
    cb(null, response);    
  }).catch(err => {
    console.log("Check Failed: ", err);
    
    if(err instanceof ValidatorResult) err = err.errors;
    
    let response = {
      statusCode: 400,
      body: JSON.stringify(err),
    };
    cb(null, response);
  });
}
