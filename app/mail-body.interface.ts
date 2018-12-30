export interface Replacements{
  [key: string]: string;
}

export interface MailBody{
  template_id: number;
  replacements: Replacements;
  html: string; 
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