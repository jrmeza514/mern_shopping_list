const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

require('dotenv').config();

app.use(express.json());

const db = process.env.MONGODB_URI;

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

app.use('/api/lists', require('./routes/api/lists'));
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.use(express.static('./client/build/'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));