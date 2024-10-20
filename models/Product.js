const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Tazas', 'Llaveros', 'Botellas', 'Camisetas', 'Lozas']
  },
  size: {
    type: String,
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

module.exports = mongoose.model('Product', productSchema);
