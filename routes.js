// Imports
const express = require('express');
const { admin, orders } = require('./models');
const router = express.Router();
const bcrypt = require('bcryptjs');
// ------------------------------------

const textToHash = (text) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(text, salt);
};

const comparePasswords = (text, hash) => {
  return bcrypt.compareSync(text, hash);
};

const orderCake = async (req, res, next) => {
  const { name, phone, cakeType, quantity } = req.body;

  try {
    const newOrder = new orders({
      name,
      phone,
      cakeType,
      quantity,
    });
    await newOrder.validate();
    const insertNewOrder = await newOrder.save();
    res.status(201).json({ success: true });
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

// const registerAdmin = async (req, res, next) => {
//   const { username, password } = req.body;

//   const hashedPassword = textToHash(password);

//   try {
//     const findAdmin = await admin.findOne({ username });
//     if (findAdmin) {
//       res.status(401).json({
//         success: false,
//         error: 'Admin with this username already exists!',
//       });
//     } else {
//       console.log(hashedPassword);
//       const newAdmin = new admin({
//         username,
//         password: hashedPassword,
//       });
//       const isValidated = await newAdmin.validate();
//       const insertedNewAdmin = await newAdmin.save();

//       res.status(210).json({ success: true, data: insertedNewAdmin.username });
//     }
//   } catch (err) {
//     // console.log(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

const getAllOrders = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const findAdmin = await admin.findOne({ username: username });

    if (!findAdmin) {
      res.status(404).json({
        success: false,
        error: 'Admin with given username not found!',
      });
    } else {
      if (comparePasswords(password, findAdmin.password)) {
        const getAllOrders = await orders.find();
        res.status(201).json({ success: true, data: getAllOrders });
      } else {
        console.log('Authorization failed');
        res.status(401).json({ success: false, error: 'Authorization failed' });
      }
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Routes
router.route('/orderCake').post(orderCake);
router.route('/getAllOrders').get(getAllOrders);
// router.route('/registerAdmin').post(registerAdmin);
// ------------------------------------

// Exports
module.exports = router;
// ------------------------------------
