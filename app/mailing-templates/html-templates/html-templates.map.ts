import { T01_SAMPLE } from './01-template.html';

export interface HtmlTemplateMap {
  subject: string;
  description: string;
  html: string;
  attachments: string[];
  status: boolean;
  replacements: string[];
}

export interface HtmlTemplateMaping {
  [key: number]: HtmlTemplateMap;
}

export const HTML_TEMPLATE_MAPING: HtmlTemplateMaping = {
  1: {
    subject: "Contact Request",
    description: "Contact Request",
    html: T01_SAMPLE.replace(/$\n^\s*/gm, ' '),
    attachments: [],
    status: true,
    replacements: ["html"]
  }
};

export const HTML_DEFAULT_TEMPLATE: HtmlTemplateMap = {
  subject: "Begin your E-Way Bill setup",
  description: "Blank html",
  html: "",
  attachments: [],
  status: true,
  replacements: ["html"]
};
