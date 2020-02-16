# Angular-CRUD

Angular-CRUD is an angular frontend built for mongoDB for ease of use without any hassle to learn any of mongo commands. This frontend allows you to connect to any mongo server, and allow you to create read update delete document as well as collections as per your need.

To view app visit:
https://angular-crud.ostanpritheshdsouza.now.sh/

## Getting Started:

1) Download all npm depedancies

2) This Project has both frontend(Angular) and backend(Express) in single codebase. To run both at one you can use npm module "concurrently".
eg:  "scripts": {
        start": "concurrently --kill-others \"ng serve --proxy-config proxyconfig.json --o\" \"node server/main.js\""
      }

3) To connect to your mongo DB, specify mongoURL in application search field. 
 eg: mongodb://localhost:port/DB
 
4) Now once you get an alert toast saying connection was successfull, you ll be able to do  CRUD operation using: CREATE READ UPDATE DELETE COLLECTION

## Authors
Ostan Dsouza - Initial work
