import { MailingObject } from './mail-body.interface';
import { SES_CONFIG } from './../config/ses-config';
import * as AWS from 'aws-sdk';

export class SesMails{

  private SES: AWS.SES;

  constructor(){
    AWS.config.update(SES_CONFIG);
    this.SES =  new AWS.SES();
  }

  public list(): Promise<any>{
    let listEmails: Promise<any> = this.SES.listVerifiedEmailAddresses().promise();
    return listEmails;
  }

  public verify(email: string): Promise<any> {
    return this.SES.verifyEmailAddress({EmailAddress: email}).promise();
  }

  public delete(email: string): Promise<any> {
    return this.SES.deleteVerifiedEmailAddress({EmailAddress: email}).promise();
  }

  public send(mailingObject: MailingObject){
    let MIME: string = `From: '${mailingObject.mailFrom.name}' <${mailingObject.mailFrom.email}>\n`;
    MIME = `${MIME}To:'${mailingObject.mailTo.name}' <${mailingObject.mailTo.email}>\n`;
    MIME = `${MIME}Subject:${mailingObject.subject}\n`;
    MIME = `${MIME}MIME-Version: 1.0\n`;
    MIME = `${MIME}Content-Type: multipart/mixed; boundary="NextPart"\n\n`;

    MIME = `${MIME}--NextPart\n`;

    MIME = `${MIME}Content-Type: text/html; charset=us-ascii\n\n\n`;
    MIME = `${MIME}${mailingObject.mailBody.html}\n`;
    MIME = `${MIME}--NextPart--`;

    // MIME = MIME + "Content-Type: text/plain;\n";
    // MIME = MIME + "Content-Disposition: attachment; filename=\"attachment.txt\"\n\n";
    // MIME = MIME + "AWS Tutorial Series - Really cool file attachment!" + "\n\n";
    // MIME = MIME + "--NextPart--";
      
    let params = {
        RawMessage: { Data: new Buffer(MIME) },
        Destinations: [ mailingObject.mailTo.email ],
        Source: "'AWS Tutorial Series' <" + mailingObject.mailFrom.email + ">'"
    };
      
    return this.SES.sendRawEmail(params).promise();
 
  }

}