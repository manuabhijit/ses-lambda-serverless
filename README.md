# SES LAMBDA MAILER
This is a project that can be straight away we deployed to AWS Lambda and provide you with REST API(s) to uses SES basic fratures and send mails.

###Features

- Build with Typescript
- Integrated with Serverless Framework for easy deployments.
- REST API(s).
- Supports HTML mailing templates.

**Table of Contents**
-------------

[TOCM]

APIs
-------------

###POST Send Mail
> http://localhost:3000/mail

**Payload :**

    {
    	"mailTo": {
    		"name": "Abhijit Srivastava",
    		"email": "manuabhijit@gmail.com"
    	},
    	"mailFrom": {
    		"name": "Abhijit Srivastava",
    		"email": "abhijit@hastpa.org"	
    	},
    	"mailBody": {
    		"template_id": 1,
    		"replacements": {
    			"html": "qwertyuiop"
    		}
    	}
    }
