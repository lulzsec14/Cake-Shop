const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: [3, 'Name can be atleast 3 characters long!'],
    maxlength: [40, 'Name can be atmax 40 characters long!'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number!'],
  },
  cakeType: {
    type: String,
    required: [true, 'Please mention cake type!'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please mention the quantitiy of the product'],
  },
});

const orders = mongoose.model('Orders', OrderSchema);

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please provide a name'],
    minlength: [3, 'Name can be atleast 3 characters long!'],
    maxlength: [40, 'Name can be atmax 40 characters long!'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
  },
});

const admin = mongoose.model('Admin', AdminSchema);

module.exports = { orders, admin };
