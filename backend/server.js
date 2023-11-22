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
    url: String,
  }],
}));

// const sampleRestaurant = new Restaurant({
//   id: 3,
//   name: "Baskin Robins",
//   image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Baskin-Robbins_logo.svg/1024px-Baskin-Robbins_logo.svg.png",
//   rating: 4.5,
//   reviews: 100,
//   menu: [{
//     id: 1,
//     name: "Ice Cream",
//     description: "Vanilla flavoured goodness!",
//     price: 10.99,
//     image: "https://i.pinimg.com/236x/cf/de/a1/cfdea1b08bbb19dd5e10c7677f97b704.jpg",
//     url: "https://go.echo3d.co/42iN"
//   },
//   {
//     id: 2,
//     name: "Sundae",
//     description: "A banana flavoured sundae!",
//     price: 10.99,
//     image: "https://i.pinimg.com/564x/a5/16/6b/a5166ba49c34b752144e7f092a823167.jpg",
//     url: "https://go.echo3d.co/F5rh"
//   }
// ]
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

// module.exports = app;
