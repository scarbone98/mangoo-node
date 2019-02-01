const express =    require('express');
const app =        express();
const port =       process.env.PORT || 8080;
const mongoose =   require('mongoose');
const schemas =    require('./schemas');
const bodyParser = require("body-parser");

mongoose.connect('mongodb://admin:cpq7DPnVtYzdWLJ@ds125058.mlab.com:25058/mangoo', {useNewUrlParser: true});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.get('/', (req, res) => {
    res.status(404);
    res.send({data: 'hello dasd'});
});

app.post('/addPost', (req, res) => {
    const { PostModel } = schemas;
    const data = req.body;
    const post = new PostModel({
        title: data.title,
        body: data.body
    });
    post.save((err) => {
        if (!err) {
            res.status(200).send({data: 'Success!'})
        } else {
            res.status(500).send({data: 'Error with server'});
        }
    })
});

app.get('/getPosts', (req, res) => {
    const { PostModel } = schemas;
    const params = req.query;
    PostModel.find({...params}, null, (err, docs) => {
        if(!err) {
            res.status(200).send({posts: docs})
        } else {
            res.status(500).send({data: 'Error with server'});
        }
    })
});



app.listen(port, () => console.log('Server Started on ' + port));