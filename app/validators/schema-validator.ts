import { Validator, ValidatorResult, Schema } from "jsonschema";

export abstract class SchemaValidator {
  
  public validator: Validator;
  public tempValidationResult: ValidatorResult;
  constructor(){
    this.validator = new Validator();
  }

  protected load(schema: Schema): void{
    this.validator.addSchema(schema, this.constructor.name);
  }

  public validate(data: any): this{    
     this. tempValidationResult = this.validator.validate(data, this.validator.schemas[this.constructor.name]);
     return this
  }

  public promise(): Promise<ValidatorResult>{
    let tempValidationResult = this.tempValidationResult;
    if(!this.tempValidationResult.errors || this.tempValidationResult.errors.length !== 0){
      this.tempValidationResult = undefined;
      return Promise.reject(tempValidationResult);
    }
    else{
      this.tempValidationResult = undefined;
      return Promise.resolve(tempValidationResult);
    }
  }

  public valueOf(): ValidatorResult{
    let tempValidationResult = this.tempValidationResult;
    this.tempValidationResult = undefined;
    return this.tempValidationResult;
  }
  
}