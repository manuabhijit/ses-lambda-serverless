export interface HtmlTemplateMap {
  subject: string;
  description: string;
  filename: string;
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
    filename: "01-template.html",
    attachments: [],
    status: true,
    replacements: ["html"]
  }
};

export const HTML_DEFAULT_TEMPLATE: HtmlTemplateMap = {
  subject: "Begin your E-Way Bill setup",
  description: "Blank html",
  filename: "00-blank.html",
  attachments: [],
  status: true,
  replacements: ["html"]
};
