"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

const restaurantName = "Restaurant Name";
const menuFilters = ["Veg", "All", "Appetizers", "Entrees", "Desserts"];

interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  url: string;
}

const IndexPage = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const [foodItems, setFoodItems] = useState<Menu[]>([]);
  const [cart, setCart] = useState<Menu[]>([]);

  const params = useParams();
  const _id = params.restaurant;

  const handleViewIn3D = (url: string) => {
    setIframeSrc(url);
    setShowIframe(!showIframe);
  };

  const addToCart = (item: Menu) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId: number) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/restaurants/${_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setFoodItems(data))
      .catch((error) => console.log('Fetching food items failed: ', error));
  }, [_id]);

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
                    <button onClick={() => handleViewIn3D(foodItem.url)} className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2">
                      View in AR/3D
                    </button>

                    <button onClick={() => addToCart(foodItem)} className="bg-gray-800 text-white px-4 py-2 rounded-md">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showIframe && <iframe src={iframeSrc} width="500" height="500"></iframe>}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-md overflow-hidden"
                >
                  {/* <img
           src={item.image}
           alt={item.name}
           className="w-full h-48 object-cover"
         /> */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm font-normal mt-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-gray-500">${item.price}</span>
                      <div>
                        <button onClick={() => removeFromCart(item.id)} className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2">
                          Remove from Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default IndexPage;
