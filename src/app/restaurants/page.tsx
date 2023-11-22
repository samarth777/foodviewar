"use client"

import React, {useEffect, useState} from "react";
import Image from "next/image";
import axios from "axios";
import Link from 'next/link';

// const popularRestaurants = [
//   {
//     id: 1,
//     name: "Restaurant 1",
//     image: "https://b.zmtcdn.com/data/pictures/chains/2/53922/2cc325e095dfa78bf99324794c0739fa_o2_featured_v2.jpg?output-format=webp",
//     rating: 4.5,
//     reviews: 100,
//   },
// ];
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
          <h1 className="text-3xl font-bold mb-4">Search Restaurants</h1>
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-80">
            <input
              type="text"
              placeholder="Enter a location"
              className="w-full outline-none"
            />
            <button className="ml-2 bg-gray-800 text-white px-4 rounded-md">
              Search
            </button>
          </div>
          {/* <div className="bg-[#6D61F2] flex flex-col rounded-xl mt-3 items-center p-5 justify-center h-full">
            <button className="mt-4 bg-[#6D61F2] text-white px-4 py-2 rounded-md">
              Tap to Scan QR Code
            </button>
            <Image src="/qr.png" alt="qr" width="150" height="150" />
          </div> */}
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
