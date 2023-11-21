// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://samarth:o2oKckr5kLTo9aKC@foodviewar.bctwubn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const Restaurant = mongoose.model('Restaurant', new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  rating: Number, 
  reviews: Number,
  menu: [{
    id: Number,
    name: String,
    description: String,
    price: Number,
    image: String,
  }],
}));

// Sample data
// const sampleRestaurant = new Restaurant({
//   id: 1,
//   name: "Sample Restaurant",
//   image: "https://example.com/sample.jpg",
//   rating: 4.5,
//   reviews: 100,
//   menu: [{
//     id: 1,
//     name: "Sample Dish",
//     description: "This is a sample dish",
//     price: 10.99,
//     image: "https://example.com/sample-dish.jpg",
//   }]
// });

// sampleRestaurant.save()
//   .then(() => console.log('Sample Restaurant saved to the database'))
//   .catch(err => console.error('Failed to save Sample Restaurant: ', err));

// fetches all restaraunnts
app.get('/api/restaurants', async (req, res) => {
  const restaurants = await Restaurant.find();
  res.send(restaurants);
});

// fetches entire restaraunt data
app.get('/api/restaurants/:id', async (req, res) => {
  const restaurant = await Restaurant.findOne({ _id: req.params.id });
  res.send(restaurant.menu);
});

app.listen(3001, () => console.log('Server listening on port 3001'));
