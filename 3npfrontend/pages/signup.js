import React from "react";
import Login from "./components/Distributor/login";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Signup() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="bg-base-500 flex items-center justify-center mt-4 mb-4">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
          <Login />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
