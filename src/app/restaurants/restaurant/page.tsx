import React from 'react';

const restaurantName = 'Restaurant Name';
const menuFilters = ['Veg', 'All', 'Appetizers', 'Entrees', 'Desserts'];

const foodItems = [
  {
    id: 1,
    name: 'Food Item 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 10.99,
    image: 'https://b.zmtcdn.com/data/dish_photos/186/386ad114b217ec3b0f8d354dbab54186.jpg',
  },
  {
    id: 2,
    name: 'Food Item 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 12.99,
    image: 'https://b.zmtcdn.com/data/dish_photos/507/0697551ecac8dd1cefe656a0944c4507.jpg',
  },
  {
    id: 3,
    name: 'Food Item 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 8.99,    
    image: 'https://b.zmtcdn.com/data/dish_photos/368/071de0e665f93aa799411eef1a8e3368.jpg',
  },
  {
    id: 4,
    name: 'Food Item 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 8.99,    
    image: 'https://b.zmtcdn.com/data/dish_photos/239/15860324ebe40f8fa5b70e1b6ac41239.jpg',
  },
  {
    id: 5,
    name: 'Food Item 5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 8.99,    
    image: 'https://b.zmtcdn.com/data/dish_photos/c3d/fceb85636f307c2cd5ba7f2f11504c3d.jpg',
  },
];

const IndexPage = () => {
//   const handleViewInAR = (foodItem) => {
//     // Handle view in AR functionality
//     console.log(`Viewing ${foodItem.name} in AR...`);
//   };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-3xl font-bold mb-4">{restaurantName}</h1>
        <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-80">
          <input
            type="text"
            placeholder="Search menu items"
            className="w-full outline-none"
          />
          <button className="ml-2 bg-gray-800 text-white px-4 py-2 rounded-md">
            Search
          </button>
        </div>
        <div className="flex items-center mt-4">
          {menuFilters.map((filter) => (
            <button
              key={filter}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {foodItems.map((foodItem) => (
            <div
              key={foodItem.id}
              className="bg-white shadow-md rounded-md overflow-hidden"
            >
              <img
                src={foodItem.image}
                alt={foodItem.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{foodItem.name}</h2>
                <p className="text-sm font-normal mt-2">
                  {foodItem.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-500">${foodItem.price}</span>
                  <div>
                    <button
                      className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2"
                    //   onClick={() => handleViewInAR(foodItem)}
                    >
                      View in AR/3D
                    </button>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;