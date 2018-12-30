import { HTML_TEMPLATE_MAPING, HtmlTemplateMap, HTML_DEFAULT_TEMPLATE } from './html-templates/html-templates.map';
import { Replacements } from '../mail-body.interface';
var fs = require("fs");

export class TemplateRenderer {

  public tempTemplate: HtmlTemplateMap;

  constructor(templateID: number, replacementData: Replacements){
    let template: HtmlTemplateMap = this.getTemplateDetails(templateID);
    template.html = this.updateBody(template.html, template.replacements, replacementData);
    this.tempTemplate = template;
  }

  public getTemplateDetails(templateID: number): HtmlTemplateMap {
    return !HTML_TEMPLATE_MAPING[templateID] ? HTML_DEFAULT_TEMPLATE : HTML_TEMPLATE_MAPING[templateID];
  }

  private updateBody(HTMLString: string, replacements: string[], replacementData: any): string {     
    for (let value of replacements) {
      let replacement: string = !replacementData[value] ? "" : replacementData[value];
      let regex: RegExp = new RegExp(`%%##${value}##%%`, "g");
      HTMLString = HTMLString.toString().replace(regex, replacement);
    }
    return HTMLString;
  }

  public getHTML(): string{
    return this.tempTemplate.html;
  }

  public getSubject(): string{
    return this.tempTemplate.subject;
  }
}
