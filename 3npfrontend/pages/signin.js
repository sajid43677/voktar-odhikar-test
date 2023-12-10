import React from "react";
import Login from "./components/Distributor/login";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Signin() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex-grow bg-base-500 flex items-center justify-center mt-4 mb-4">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
          <Login />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
