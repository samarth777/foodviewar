"use client";

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
  quantity: number;
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

  const addToCart = (foodItem: Menu) => {
    setCart((prevCart) => {
      if (!prevCart.some((item) => item.id === foodItem.id)) {
        return [...prevCart, { ...foodItem, quantity: 1 }];
      }
      return prevCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    newQuantity = newQuantity < 1 ? 1 : newQuantity;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
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
      .catch((error) => console.log("Fetching food items failed: ", error));
  }, [_id]);

  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex">
      <div className="w-3/4">
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
                    <span className="text-gray-500 p-2">Rs {foodItem.price}</span>
                    <div>
                      <button
                        onClick={() => handleViewIn3D(foodItem.url)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2"
                      >
                        View in AR/3D
                      </button>

                      <button
                        onClick={() => addToCart(foodItem)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showIframe && (
            <iframe src={iframeSrc} width="500" height="500"></iframe>
          )}
        </div>
      </div>
      {cart.length > 0 && (
        <div className="w-1/4 m-5 p-5 mt-10">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <div className="p-2 mt-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-md overflow-hidden p-2 m-2"
              >
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm font-normal mt-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-500">
                      Rs {item.price * item.quantity}
                    </span>
                    <div>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-gray-800 text-white px-4 py-2 m-2  rounded-md mr-2"
                      >
                        -
                      </button>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-gray-800 text-white px-4 m-2 py-2 rounded-md"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md"
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-xl font-bold">Total: Rs {totalCartPrice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
