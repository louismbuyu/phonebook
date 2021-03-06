const express = require('express');
const Contact = require('./src/models/Contact');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./src/config/keys');
const app = express();

mongoose.connect(keys.MONGO_URL, { useNewUrlParser: true });
app.use(bodyParser.json());

app.get('/', (req,res) => {
    return res.json({message: "Hello World!"});
});

app.get('/test', (req,res) => {
    return res.json({message: "Test success"});
});

app.get('/all', (req,res) => {
    Contact.find({}).exec((error, contacts) => {
        if (error){
            return res.status(404).json({message: "Error: "+error})
        }
        return res.json({contacts});
    });
});

app.get('/get/:id', (req,res) => {

    if (!req.params.id){
        return res.status(403).json({message: "Please provide an id"})
    }

    Contact.findOne({_id: req.params.id}).exec((error, contact) => {

        if (error){
            return res.status(404).json({message: "Error: "+error})
        }

        return res.json({contact});
    });
});

app.post('/add', (req,res) => {

    const newContact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        location: req.body.location,
        favorite: req.body.favorite
    });

    newContact.save( (error, savedContact) => {

        if (error){
            return res.status(404).json({message: "Error: "+error})
        }

        return res.json({contact: savedContact});
    });

});


app.put('/update/:id', (req,res) => {

    if (!req.params.id){
        return res.status(403).json({message: "Please provide an id"});
    }

    Contact.findOne({_id: req.params.id}).exec((error, contact) => {

        if (error){
            return res.status(404).json({message: "Error: "+error})
        }

        if (!contact){
            return res.status(404).json({message: "Contact not found"});
        }

        if (req.body.firstName) {
            contact.firstName = req.body.firstName;
        }

        if (req.body.lastName) {
            contact.lastName = req.body.lastName;
        }

        if (req.body.age) {
            contact.age = req.body.age;
        }

        if (req.body.location) {
            contact.location = req.body.location;
        }

        if (req.body.favorite) {
            contact.favorite = req.body.favorite;
        }

        contact.save((error,savedContact) => {
            if (error){
                return res.status(404).json({message: "Error: "+error})
            }

            return res.json({contact: savedContact});
        });

    });
});

app.delete('/delete/:id', (req,res) => {

    if (!req.params.id){
        return res.status(403).json({message: "Please provide an id"})
    }

    Contact.findOneAndRemove({_id: req.params.id}).exec((error, contact) => {

        if (error){
            return res.status(404).json({message: "Error: "+error})
        }

        return res.json({contact});
    });

});

app.delete('/delete/:id', (req,res) => {

    if (!req.params.id){
        return res.status(403).json({message: "Please provide an id"})
    }

    Contact.findOneAndRemove({_id: req.params.id}).exec((error, contact) => {

        if (error){
            return res.status(404).json({message: "Error: "+error})
        }

        return res.json({contact});
    });

});

app.delete('/deleteall', (req,res) => {

    Contact.deleteMany({}).exec((error, contacts) => {
        if (error){
            return res.status(404).json({message: "Error: "+error})
        }
        return res.json({message: "All contacts have been deleted"});
    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});