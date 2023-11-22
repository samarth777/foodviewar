"use client"

import React, {useEffect, useState} from "react";
import Image from "next/image";
import axios from "axios";
import Link from 'next/link';

interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  _id: string
}

const IndexPage = () => {
  const [popularRestaurants, setPopularRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/restaurants');
        setPopularRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching data from server:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex flex-col items-center">
          {/* <h1 className="text-3xl font-bold mb-4">Search Restaurants</h1> */}
          {/* <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-80">
            {/* <input
              type="text"
              placeholder="Enter a location"
              className="w-full outline-none"
            /> */}
            {/* <button className="ml-2 bg-gray-800 text-white px-4 rounded-md">
              Search
            </button> */}
          {/* </div> */}
        </div>
        <div className="flex">
          {popularRestaurants.map((restaurant) => (
          <Link href={`/restaurants/${restaurant._id}`}>
            <div
              key={restaurant.id}
              className="bg-white shadow-md rounded-md p-5 m-5 overflow-hidden"
            >
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                width={400}
                height={400}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 mr-1">
                    {restaurant.rating}
                  </span>
                  <span className="text-gray-500">
                    ({restaurant.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
