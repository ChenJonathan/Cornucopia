var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://heroku_pmrvv2vc:kbp43neuv3gnkt8br4skdq3a41@ds037145.mlab.com:37145/heroku_pmrvv2vc';

console.log("populate ran");

var insertRecipe = function(db, callback) {
   db.collection('recipes').insertOne( {
      "ingredients" : [
        {
         "flour" : "2 cups",
         "sugar" : "1 cup",
         "butter" : "1 stick",
         "eggs" : "four"
        },
      ],
      "name" : "Manhattan Cake",
      "author" : "John",
      "instructions" : [
         {
            "prep" : "stuff",
            "cooking" : "cook",
            "serve" : "lightly incinerated"
         },
      ],
      "name" : "Chen",
      "rating" : 1
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});

var findRecipe = function(db, callback) {
   var cursor = db.collection('recipes').find();
   assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
  }



//mocha test

describe('Post recipe', function() {
    it('should return success after adding new recipe', function(done) {
        var request = require('supertest');
        var recipe = {
            "ingredients" : [
                {
                 "flour" : "2 cups",
                 "sugar" : "1 cup",
                 "butter" : "1 stick",
                 "eggs" : "four"
                },
              ],
              "name" : "Manhattan Cake",
              "author" : "John",
              "instructions" : [
                 {
                    "prep" : "stuff",
                    "cooking" : "cook",
                    "serve" : "lightly incinerated"
                 },
              ],
              "name" : "Chen",
              "rating" : 1
           };

    request(url)
        .post('/api/recipe')

        .end(function(err, res) {
            if (err) {
                throw err;
          }
            res.should.have.property(‘status’, 201);
            done();
        });
    });
});