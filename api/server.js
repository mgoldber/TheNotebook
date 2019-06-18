'use strict';

const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const passport = require('passport');

const User = require('./routes/users/usersModel');



const { URL, PORT } = require('./utils/constants');

// Create main express instance
const router = express();

// Require routes
const { router: noteRoutes } = require('./routes/notes/notesRoutes');
const { router: userRoutes } = require('./routes/users/usersRoutes'); 

// Utilize routes
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(passport.initialize());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use('/api', noteRoutes); 
router.use('/api', userRoutes);



// Create a server from express instance
const server = http.createServer(router);

mongoose
    .connect(URL, { useNewUrlParser: true })
    .then(async () => {
        console.log(`Connected to database at ${URL}`);
        server.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    })
