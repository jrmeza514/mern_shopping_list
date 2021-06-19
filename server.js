const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

//Initialize Environment variables
require('dotenv').config();


// Body Parse Middleware
app.use(express.json());

//DB Config
const db = process.env.MONGODB_URI;

//Connect to Mongoose
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

// Add Custom Routers
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

//Resolve default routes
app.use(express.static('./client/build/'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));