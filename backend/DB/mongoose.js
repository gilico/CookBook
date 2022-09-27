const mongoose = require('mongoose');

try
{
    mongoose.connect('mongodb://localhost:27017/recipes').then(console.log("Connected to recipes db"));
} catch (error)
{
    console.log("Db is failed to connect");
}
