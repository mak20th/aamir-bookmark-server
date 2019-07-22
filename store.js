const uuid = require('uuid/v4'); // for generating unique ID
const bookmarks = [
  {
    id: uuid(),
    title:'bookmarkTest1',
    url:'https://www.myTest1.com',
    desc:'Testing 1',
    rating: 5, 
  },
  {
    id: uuid(),
    title:'bookmarkTest2',
    url:'https://www.myTest2.com',
    desc:'Testing 2',
    rating: 4, 
  },
  {
    id: uuid(),
    title:'bookmarkTest3',
    url:'https://www.myTest3.com',
    desc:'Testing 3',
    rating: 3, 
  },
  {
    id: uuid(),
    title:'bookmarkTest2',
    url:'https://www.myTest2.com',
    desc:'Testing 2',
    rating: 2, 
  }  
];
module.exports= {bookmarks}; //object not array notation