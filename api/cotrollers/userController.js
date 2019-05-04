
var Users = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/config')

const userController = {}

userController.save = function (req, res, next) {
  Users.find({ email: req.body.email }).exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(409).json({ msg: "Email Exists!!" })
      }
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            const user = new Users({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              mobile: req.body.mobile,
              password: hash
            });
            user.save()
              .then(result => {

                res.render('success');
                console.log(result);
              })
              .catch(err => {
                res.status(500).json(
                  { error: err }
                )
              });

          }
        })

      }

    }).
    catch(err => {
      res.status(500).json({ err });
    })



}


userController.show = function (req, res) {
  Users.find({}).exec(function (err, users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      console.log(users);
      res.render('display', { users: users });
    }
  });
}

userController.signin = function (req, res) {
  res.render('login');
}

userController.signup = function (req, res) {
  res.render('register');
}

userController.display = function (req, res) {
  res.render('index');

}
userController.showAbout = function (req, res) {
  res.render('about');

}
userController.showContact = function (req, res) {
  res.render('contact');

}
userController.validateUser = function (req, res) {
  Users.findOne({ email: req.body.email },

    
    (err, user) => {
      if (err) {
        return res.status(500).send('Error on the server.');
      }
      if (user.length<=1) {
        return res.status(404).send('No user found.');
      }
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password, (err, result) => {
        if (err) {
          res.status(401).json({ message: "Auth failed" })
          console.log(err)
        }
        if (result) {
          res.status(200).json({ message: "Auth Success" })
          res.render('success');
        }
      });
      if (!passwordIsValid)
        return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id, email: user.email }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
      // console.log("Success")
    });

}




module.exports = userController;