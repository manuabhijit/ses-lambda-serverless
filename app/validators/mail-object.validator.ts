import { SchemaValidator } from "./schema-validator";
import { MAIL_OBJECT_SCHEMA } from "./schemas/schemas";

export class MailObjectValidator extends SchemaValidator{

  constructor(){
    super();
    this.load(MAIL_OBJECT_SCHEMA);
  }
}