const myExpress = require('express');

const uuid = require('uuid/v4');// for unique identifier 'npm install uuid'
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
    for(const field of ['title', 'url','rating']){ // if either title, url or rating is not provided throw an error
      if(!req.body[field]){
        logger.error(`${field} is required YO`);
        return res
          .status(400)
          .send(`${field} is required YO`);
      }
    }
    const { title, url, desc, rating } = req.body;

    if(!Number.isInteger(rating) || rating < 0 || rating > 5){ // check if rating is avalid number 0 and 5
      logger.error(`Invalid rating ${rating} provided`);
      return res
        .status(400)
        .send('Rating must be a number between 0 and 5 YO');
    }
    if(!isWebUri(url)){ // validate URL to see if format correct 'npm install valid-url'
      logger.error(`Invalid url ${url} provided YO`);
      return res
        .status(400)
        .send('You must provide a valid url YO');
    }

    const newBookmark = {
      id: uuid(),
      title, 
      url, 
      desc, 
      rating
    };

    bookmarks.push(newBookmark);
    logger.info(`Bookmark ${newBookmark} has been created :)`);
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${newBookmark.id}`)
      .json(newBookmark);

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