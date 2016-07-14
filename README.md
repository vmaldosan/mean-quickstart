[![Build Status](https://travis-ci.org/vmaldosan/mean-quickstart.svg?branch=master)](https://travis-ci.org/vmaldosan/mean-quickstart)
[![Dependency Status](https://david-dm.org/vmaldosan/mean-quickstart.svg)](https://david-dm.org/vmaldosan/mean-quickstart)

# mean-quickstart
Skeleton for an app using MongoDB, ExpressJS, Angular 2, NodeJS, Babel-Gulp and ES6.

Work in progress! 
Current version: 1.0.0

Got inspiration from many other repos and tutorials, especially:
* https://github.com/shuhei/babel-angular2-app
* http://thejackalofjavascript.com//developing-a-mean-app-with-angular-2-0

and obviously, the offical Angular 2 documentation at https://angular.io/docs/ts/latest/quickstart.html

## Usage

1. Clone or download repo from https://github.com/vmaldosan/mean-quickstart
2. If not already present, install NodeJS and MongoDB.
3. From the command line on the project dir, run ```npm install```.
4. To insert test data, run ```node db\testData.js```.
5. Build with ```gulp build``` (changes can be automatically deployed while ```gulp watch``` is running).
5. Start server with ```node server.js```.
6. Enter http://localhost:3000/ to run the app.
