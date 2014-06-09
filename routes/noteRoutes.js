'use strict';
var Note = require('../models/Note');

module.exports = function(app, passport) {
    app.get('/api/v1/notes', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        Note.find({}, function(err, notes) {
            if(err) {
                res.send(500, {error: err});
                return false;
            }
            res.send(notes);
        });
    });// end app.get collection

    app.get('/api/v1/notes/:id', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        Note.findOne({'_id': req.params.id}, function(err, note) {
            if(err) {
                res.send(500, {error: err});
                return false;
            }
            res.send(note);
        });
    });// end app.get note by id

    app.post('/api/v1/notes', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        var note = new Note({noteBody: req.body.noteBody});
        note.save(function(err, resNote) {
            if(err) {
                res.send(500, {error: err});
                return false;
            }
            res.send(resNote);
        });
    });// end app.post

    app.put('/api/v1/notes/:id', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        var id = req.params.id;
        delete req.body._id;

        Note.findOneAndUpdate({'_id' : id}, req.body, function(err, note) {
            if (err) {
                res.send(500, {error: err});
            } else {
                res.send(note);
            }
        });
    });// end app.put

    app.delete('/api/v1/notes/:id', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        Note.remove({'_id' : req.params.id}, function(err) {
            if(err) {
                res.send(500, {error: err});
                return false;
            }
            res.send({'message' : 'success!'});
        });
    });// end app.delete
};// end module.exports
