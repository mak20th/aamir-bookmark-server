const myExpress = require('express');

const uuid = require('uuid/v4');// for unique identifier
const logger = require('../logger');//file containing logging tool
const {bookmarks} = require('../store');
const {isWebUri} = require('valid-url'); // for web URL validation
const bookmarksRouter = myExpress.Router();// create a Route using Router.
const bodyparser = myExpress.json();//to parse json body in POST methods

bookmarksRouter
  .route('/bookmarks')
  .get((req,res)=>{
    //implementation logic goes here
    res
      .json(bookmarks);   
  })
  .post(bodyparser, (req, res)=>{
    //implementation logic goes here
  });

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res)=>{
    //implementation logic here
  })
  .delete((req, res)=>{
    //implmentation logic here
  });

module.exports =  {bookmarksRouter};