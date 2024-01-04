import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function FishAndMeat() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPro = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "distributor/getChaldalDataFishMeat/",
        { withCredentials: true }
      );
      const data = res.data;
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPro();
  }, []);

  const renderSkeleton = () => (
    <div className="grid grid-cols-3 gap-3">
      {[...Array(30)].map((_, index) => (
        <div
          key={index}
          className="card w-auto bg-base-300 shadow-xl animate-pulse"
        >
          <div className="card-body">
            <div className="h-8 bg-gray-300 mb-4"></div>
            <div className="h-4 bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {loading ? (
        // Show loading skeleton
        renderSkeleton()
      ) : (
        // Display content when data is loaded
        <div className="grid grid-cols-3 gap-3">
          <div className="card w-auto bg-base-300 shadow-xl">
            <div className="card-body items-center justify-center">
              <h1>Collected From Chaldal.com</h1>
            </div>
          </div>
          {product.map((content, index) => (
            <div key={index} className="card w-auto bg-base-300 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{content.name}</h2>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{content.quantity}</div>
                  <div className="badge badge-outline">{content.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
