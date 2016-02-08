var db = require('../db');




module.exports = {
  messages: {
    get: function (callback) {
      // username, roomname, text, 
      var queryString = 'Select messages.id, messages.text, messages.roomname from messages\
                          left outer join users on (messages.userid = username)\
                          order by messages.id desc';
      db.query(queryString, function(err, result) {
        if(err) {
          console.error(err);
          // return;
        } else {
          callback(result);
        }
      });
    },
    post: function (params, callback) {
      var queryString = 'insert into messages (text, username, roomname)\
                          values (?, (select id from users where username = ? limit 1), ?)';
      db.query(queryString, params, function(err, result) {
        if(err) {
          console.error(err);
          // return;
        } else {
          callback(result);
        }
        
      });
    }
  },

  users: {
    get: function (callback) {
      var queryString = 'select * from users'
      db.query(queryString, function(err, result) {
        if(err) {
          console.error(err);
          // return;
        } else {
          callback(result);
        }
      });
    },
    post: function (params, callback) {
      var queryString = 'insert into users (username) values (?)';
      db.query(queryString, params, function(err, result) {
        if(err) {
          console.error(err);
          // return;
        } else {
          callback(result);
        }
      });
    }
  }
};

