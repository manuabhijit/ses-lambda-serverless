export interface MailBody{
  html: string;
  data?: any;
}

export interface EmailIdObject{
  name?: string;
  email: string;
}

export interface MailingObject{
  mailFrom: EmailIdObject,
  mailTo: EmailIdObject,
  mailToCC?: EmailIdObject[],
  mailToBcc?: EmailIdObject[],
  subject: string;
  mailBody: MailBody,
}