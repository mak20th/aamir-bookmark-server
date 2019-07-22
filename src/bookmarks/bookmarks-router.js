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
    //implementation logic goes here~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    res
      .json(bookmarks);   
  })
  .post(bodyparser, (req, res)=>{
    //implementation logic goes here~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  });

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res)=>{
    //implementation logic here~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const {id} = req.params;
    const bookmark = bookmarks.find(b => b.id === id);
    //make sure we found the bookmark
    if(!bookmark){
      logger.error(`Bookmark with id ${id} not found :(`);
      return res
        .status(404)
        .send('Bookmark Not Found :(');
    }
    res.json(bookmark);
  })
  .delete((req, res)=>{
    //implmentation logic here~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const {id} = req.params;
    const bookmarkIndex = bookmarks.findIndex(b => b.id === id);
    if(bookmarkIndex === -1){
      logger.error(`Bookmark with id ${id} not found :(`);
      return res 
        .status(404)
        .send('Bookmark you want to delete does not exist :(');
    }
    //remove bookmark from store
    bookmarks.splice(bookmarkIndex,1);
    logger.info(`Bookmark with id ${id} has been deleted :) `);
    res; 
    status(204)
      .end();
  });

module.exports =  {bookmarksRouter};