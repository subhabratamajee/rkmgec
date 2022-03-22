const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'SUPERSECRETE20220';

const saltRounds = 10;
const url = 'mongodb+srv://rkmgeclogin:rkmgecloginric2016@cluster0.uwx19.mongodb.net/login?retryWrites=true&w=majority';
const dbName = 'login';

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function findUser(db, roll, callback) {
  const collection = db.collection('students');
  collection.findOne({roll}, callback);
}

function authUser(db, roll, password, hash, callback) {
  const collection = db.collection('students');
  bcrypt.compare(password, hash, callback);
}

export default (req, res) => {
  if (req.method === 'POST') {
    //login
    try {
      assert.notEqual(null, req.body.roll, 'Roll No required');
      assert.notEqual(null, req.body.password, 'Password required');
    } catch (bodyError) {
      res.status(403).send(bodyError.message);
    }

    client.connect(function(err) {
      assert.equal(null, err);
      // console.log('Connected to MongoDB server =>');
      const db = client.db(dbName);
      const roll = req.body.roll;
      const password = req.body.password;

      findUser(db, roll, function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: 'Error finding User'});
          return;
        }
        if (!user) {
          res.status(404).json({error: true, message: 'User not found'});
          return;
        } else {
          authUser(db, roll, password, user.password, function(err, match) {
            if (err) {
              res.status(500).json({error: true, message: 'Auth Failed'});
            }
            if (match) {
              const token = jwt.sign(
                {userId: user.userId, email: user.roll},
                jwtSecret,
                {
                  expiresIn: 3000, //50 minutes
                },
              );
              res.status(200).json({token});
              return;
            } else {
              res.status(401).json({error: true, message: 'Auth Failed'});
              return;
            }
          });
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }
}; 