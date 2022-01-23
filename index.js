const express=require("express");
const path=require("path");
const stripe = require('stripe')('sk_test_51I3wVOKwc4mI1upsH0VZFY1AReuanTq5CUB9cvkb0M6HrYPAWNxjoA48rBL9N9BgRF9dlM4cdLxdZKwHE1wKcEvK00sCDOxBmY');

const app=express();
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.get('/index',(req,res)=>{
    res.render('index');
});

app.post('/charge', (req, res) => {
    try {
        // stripe.customers.create({
        //     name: req.body.name,
        //     email: req.body.email,
        //     source: req.body.stripeToken
        // })
        // .then(customer => {
        //     console.log(customer);
        //     return stripe.charges.create({
        //         amount: req.body.amount * 100,
        //         currency: 'inr',
        //         customer: customer.id,
        //         description: 'Thank you for your generous donation.'
        //     })
        // })
        // .then((charge) => {
        //     console.log(charge);
        //     res.render('complete');
        // })
        // .catch(err => console.log(err))
        stripe.charges.create({
            amount: req.body.amount * 100,
            currency: 'inr',
            source: req.body.stripeToken,
            description: 'Thank you for your generous donation.'
        })
        .then((charge) => {
            console.log(charge);
            res.render('complete');
        })
        .catch(err => console.log(err))
    } catch (err) { res.send(err) }
});

app.get('/getData',(req,res)=>{
    stripe.charges.retrieve('ch_1KHncRKwc4mI1upsAet3fxmM', {
        expand: ['customer', 'invoice.subscription'],
    })
    .then((data)=>console.log(data));
    res.redirect('back');
});


app.listen(8000,(err)=>{
    if(err){
        console.log("Error-->",err);
        return;
    }
    console.log("Server listening on port ",8000);
});
