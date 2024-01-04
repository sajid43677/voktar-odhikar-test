import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function CurrentPrice() {
  const [product, setproduct] = useState();
  const fetchPro = async (url) => {
    const res = axios.get(
      process.env.NEXT_PUBLIC_API_End + "distributor/getChaldalDataVeg/",
      { withCredentials: true }
    );
    const data = (await res).data;
    setproduct(data);
    console.log(data);
  };

  useEffect(() => {
    fetchPro();
  }, []);

  return (
    <>
      {product && (
        <div className="grid grid-cols-3 gap-3">
          <div className="card w-96 bg-base-300 shadow-xl">
            <div className="card-body items-center justify-center">
              <h1>Collected From Chaldal.com</h1>
            </div>
          </div>
          {product.map((content, index) => (
            <div className="card w-96 bg-base-300 shadow-xl">
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
