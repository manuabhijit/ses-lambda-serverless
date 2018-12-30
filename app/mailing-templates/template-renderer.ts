import { HTML_TEMPLATE_MAPING, HtmlTemplateMap, HTML_DEFAULT_TEMPLATE } from './html-templates/html-templates.map';
import { Replacements } from '../mail-body.interface';
var fs = require("fs");

export class TemplateRenderer {

  public HTML: string;

  constructor(templateID: number, replacementData: Replacements){
    let template: HtmlTemplateMap = this.getTemplateDetails(templateID);
    let rawHTML: string = this.readTemplateFile(template.filename);
    this.HTML = this.updateBody(rawHTML, template.replacements, replacementData);
  }

  public getTemplateDetails(templateID: number): HtmlTemplateMap {
    return !HTML_TEMPLATE_MAPING[templateID] ? HTML_DEFAULT_TEMPLATE : HTML_TEMPLATE_MAPING[templateID];
  }

  private readTemplateFile(filename: string): string {
    let HTMLString: string;
    let path: string = `${__dirname}html-templates/${filename}`;
    console.log(path);
    try {
      let data: any = fs.readFileSync(path);
      HTMLString = data.toString().replace(/\r?\n?/g, "");
    } catch (Error) {
      console.log("File not found");
      HTMLString = "";
    }

    return HTMLString;
  }

  private updateBody(HTMLString: string, replacements: string[], replacementData: any): string {     
    for (let value of replacements) {
      let replacement: string = !replacementData[value] ? "" : replacementData[value];
      let regex: RegExp = new RegExp(`%%##${value}##%%`, "g");
      HTMLString = HTMLString.toString().replace(regex, replacement);
    }
    return HTMLString;
  }

  public getHTML(){
    return this.HTML;
  }
}
