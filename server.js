const express = require('express');
const mongoose = require('mongoose');
const itemsRouter = require('./routes/api/items');
const path = require('path');
const app = express();

// Body Parse Middleware
app.use(express.json());

//DB Config
const db = require("./config/keys").mongoURI;
console.log(db);
//Connect to Mongoose
mongoose.connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch( err => console.log(err))

app.use('/api/items', itemsRouter);

if(process.env.NODE_ENV === 'prodction'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'cliend', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));