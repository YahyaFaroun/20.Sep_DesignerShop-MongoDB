const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
const productItems = require('./models/items')
const random = productItems;
//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dbUri = "mongodb+srv://supercode:supercode@cluster0.puw0v.mongodb.net/superDatabase?retryWrites=true&w=majority";

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(process.env.PORT || 3019, () => {
            console.log('listening at 3019');
        })
    })
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    productItems.find()
        .then(result => {
            res.render('index', { items: result })
        })
        .catch(err => console.log(err))
})


app.get('/details/:id', (req, res) => {
    console.log(req.params.id);
    productItems.findById(req.params.id)
        .then(result => {
            res.render('details', { items: result })
        })
        .catch(err => console.log(err))
})

//Random 6 Funktioniert
app.get("/add", (req, res) => {
    productItems.aggregate([{ $sample: { size: 6 } }])
        .then((result) => {
            res.render("add", { randomGallery: result });
        })
        .catch((err) => console.log(err));
});
//Hunzufügen
app.post('/add', (req, res) => {
    const newItem = new productItems({
        Product_Name: req.body.product,
        Company: req.body.company,
        Price: req.body.price,
        Product_Picture_Link: req.body.url,
        Link_Shop: req.body.shop
    })
    newItem.save()
        .then(result => {
            console.log('new contact saved');
            res.status(201).redirect("/")
        })
        .catch(err => console.log(err))
})


app.get('/details/:id/delete', (req, res) => {
    productItems.findByIdAndDelete(req.params.id)
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})


app.post('/details/:id/edit', (req, res) => {
    const updateItems = {
        Product_Name: req.body.product,
        Company: req.body.company,
        Price: req.body.price,
        Product_Picture_Link: req.body.url,
        Link_Shop: req.body.shop,
    }
    productItems.findByIdAndUpdate(req.params.id, updateItems)
        .then(result => {
            res.redirect(`/details/${req.params.id}`)
        })
        .catch(err => console.log(err))
})


app.get('/lessThen', (req, res) => {
    productItems.aggregate([{ $match: { Price: { $lte: 30 } } }])
        .then((result) => {
            res.render("lessThen", { items: result });
        })
        .catch((err) => console.log(err));
});


app.get('/recommendations', (req, res) => {
    productItems.aggregate([{ $sample: { size: 6 } }])
        .then((result) => {
            res.render("recommendations", { items: result });
        })
        .catch((err) => console.log(err));
});

