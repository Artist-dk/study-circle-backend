const db = require('../config/database');

class Conatactus {
  static sendMessage(messageData, callback) {
    const { firstname, lastname, phoneno, emailid, message } = messageData
    console.log(messageData)
 
    // (id, senderId, recipientId, messageType, messageContent, mediaSource, sentAt)

    const sql =  `INSERT INTO messages (senderId, recipientId, messageType, messageContent, mediaSource, sentAt)
    VALUES (?, ?, ?, ?, ?, ?)`
    db.query(sql, [ firstname, lastname, phoneno, emailid, message ], (err, results) => {
      if (err) { return callback(err, null); }
      callback(null, results);
    });
  } 
}

module.exports = Conatactus;