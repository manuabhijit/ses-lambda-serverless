import { Schema } from "jsonschema";

export const MAIL_OBJECT_SCHEMA: Schema = {
  definitions: {},
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  required: ["mailTo", "mailFrom", "subject", "mailBody"],
  properties: {
    mailTo: {
      type: "object",
      required: ["name", "email"],
      properties: {
        name: {
          type: "string",
          pattern: "^(.*)$"
        },
        email: {
          type: "string",
          pattern: "^(.*)$"
        }
      }
    },
    mailFrom: {
      type: "object",
      required: ["name", "email"],
      properties: {
        name: {
          type: "string",
          pattern: "^(.*)$"
        },
        email: {
          type: "string",
          pattern: "^(.*)$"
        }
      }
    },
    subject: {
      type: "string",
      pattern: "^(.*)$"
    },
    mailBody: {
      type: "object",
      required: ["data"],
      properties: {
        data: {
          type: "object",
          required: ["replacements"],
          properties: {
            replacements: {
              type: "object"
            }
          }
        }
      }
    }
  }
};
