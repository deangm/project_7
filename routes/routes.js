//routes.js
const express = require('express');
const app = express.Router();
const repository = require('../repos/userRepo');
// get all User items in the db
app.get('/', (req, res) => {
  repository.findAll().then((Users) => {
    res.render('users', {users: Users});
  }).catch((error) => console.log(error));
});
// add a User item
app.post('/', (req, res) => {
  const { first, last, age, email } = req.body;
  repository.create(first, last, age, email).then((User) => {
    res.json(User);
    res.end();
  }).catch((error) => console.log(error));
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  repository.delete(id);
   res.redirect('/user');
})

app.get('/update/:id', (req, res) => {
  const id = req.params.id
  repository.findById(id).then(user => {
    console.log(user);
    res.render('edit', {user: user[0]})
  }) 
})

app.post('/update/:id', (req, res) => {
  const id = req.params.id
  const { first, last, age, email } = req.body;
  repository.update(id, first, last, age, email);
   res.redirect('/user');
})



module.exports = app;