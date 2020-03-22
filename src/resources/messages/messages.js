const express = require('express'),
    router = express.Router(),
    Message = require('./schema.js'),
    authorize = require('../../auth/auth.js');



/**
 * Get Messages For User
 */

router.get('/:username', (req, res) => {
    let username =  req.params.username;

    //Authorization
    authorize(req,res);

    
    Message.find({
        username: username
    }, (err, doc) => {
        if(err) {
            res.status(500).json({
                err: err
            });
            console.log(`Error getting messages for user:\n ${username}\n${err}`);   
        }
        res.status(200).json({
            response: doc
        });
    });
});

/**
 * Get Newest Message For User
 */
router.get('/:username/new', (req, res) => {
    let username =  req.params.username;

    //Authorization
    authorize(req,res);


    Message.findOne({
        username: username
    }, {}, { 
        sort: {
            'time' : -1 
        } 
    }, (err, doc) => {
        if(err) {
            res.status(500).json({
                err: err
            });
            console.log(`Error getting newest message for user:\n ${username}\n${err}`);   
        }
        res.status(200).json({
            response: doc
        });
    });
});

/**
 * Post Message
 */

router.post('/:username', (req, res) => {
    let message = {
        message: req.body.message,
        username: req.params.username,
        time: req.body.time
    };

    //Authorization
    authorize(req,res);

    Message.create(message, (err, doc) => {
        if(err) {
            res.status(500).json({
                err: err
            });
            console.log(`Error creating new message:\n ${message}\n${err}`);   
        }
        res.status(200).json({
            response: doc
        });
    });
});

module.exports = router;
