const User = require('../models/user');

class userRepository {
    constructor(model){
        this.model = model;
    }

    create(first, last, age, email) {
        const newUser = {first, last, age , email};
        const User = new this.model(newUser);
        return User.save();
    }

    findAll() {
        return this.model.find();
    }

    delete(id){
       this.model.findByIdAndRemove(id, (err, todo) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            const response = {
                message: "user successfully deleted",
                id: id
            };
            return response
        });
    }

    findById(id){
        return this.model.find({_id: id})
    }

    update(id, first, last, age , email){
        this.model.findById(id).then(doc => {
            doc.first = first;
            doc.last = last;
            doc.age =age;
            doc.email = email
            return doc.save();
        })
    }
}

module.exports = new userRepository(User);