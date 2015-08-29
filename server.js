var express  = require('express');
var app      = express();                                                
var morgan = require('morgan');           
var mongoose = require('mongoose');  
var bodyParser = require('body-parser');  
var methodOverride = require('method-override');
var config  = require('./config');
var Bookmark = require('./model/bookmarks'); 

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());




mongoose.connect(config.database,function(error){
    if (error) console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?',error);
    else console.log('mongo connected to -> ',config.database);
});

// application -------------------------------------------------------------
app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


//api
app.get('/api/bookmarks', function(req, res) {
    //console.log('before find');
    // use mongoose to get all bookmarks in the database
    Bookmark.find(function(err, bookmarks) {
        //console.log('get bookmarks server side');
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(bookmarks); // return all bookmarks in JSON format
    });
});

// create bookmark and send back all bookmarks after creation
app.post('/api/bookmarks', function(req, res) {
    //console.log('server api got hit');
    var bookmark = new Bookmark({
        word: req.body.word,
        description: req.body.description,
        audio_url : req.body.audio_url
    });
    //console.log(bookmark);
    // create a bookmark, information comes from AJAX request from Angular
    bookmark.save(function(err, records) {
        if (err)
            res.send(err);

        // get and return all the bookmarks after you create another
        Bookmark.find(function(err, bookmarks) {
            if (err)
                res.send(err)
            res.json(bookmarks);
        });
    });

});

// delete a bookmark
app.delete('/api/bookmarks/:word_id', function(req, res) {
    Bookmark.remove({
        _id : req.params.word_id
    }, function(err, records) {
        if (err)
            res.send(err);

        // get and return all the bookmarks after you create another
        Bookmark.find(function(err, bookmarks) {
            if (err)
                res.send(err)
            res.json(bookmarks);
        });
    });
});

// delete all bookmark
app.delete('/api/bookmarks/', function(req, res) {
    Bookmark.remove({}, function(err, records) {
        if (err)
            res.send(err);

        // get and return all the bookmarks after you create another
        Bookmark.find(function(err, bookmarks) {
            if (err)
                res.send(err)
            res.json(bookmarks);
        });
    });
});

// listen (start app with node server.js) ======================================
app.listen(config.port);
console.log("App listening on port 8080");
