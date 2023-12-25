import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import EditProduct from "./editProduct";
import AddProduct from "./addProduct";

export default function Dashboard() {
  const headerColumns = ["", "Product", "Price", "Quantity Stored"];
  const [products, setProducts] = useState({});
  const [admins, setAdmins] = useState({});
  const [distributors, setDistributors] = useState({});
  const [industries, setIndustries] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const [Sdata, setSdata] = useState("");
  const [issearch, setissearch] = useState(false);

  const onSubmit = (data) => {
    console.log("Form submitted", data);
    setissearch(true);
    setSdata(data.SearchData);
  };

  const form = useForm({
    defaultValues: {
      SearchData: "",
    },

    mode: "all",
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;
  const fetchPro = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "distributor/viewinventory/",
        { withCredentials: true }
      );

      console.log(res);
      console.log(res.data);
      setProducts(res.data);
      console.log(products);

      const res2 = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "distributor/viewiAdminlist/",
        { withCredentials: true }
      );
      setAdmins(res2.data);
      const res3 = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "distributor/viewiindustrylist/",
        { withCredentials: true }
      );
      setIndustries(res3.data);
      const res4 = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "distributor/viewiDistributorlist/",
        { withCredentials: true }
      );
      setDistributors(res4.data);
      setIsProfile(true);
    } catch (error) {
      console.log(
        error.hasOwnProperty("response")
          ? error.response.data.message
          : error.message
      );
      //alert("Wrong Email or Password");
      // Handle other errors (e.g., network issues, server errors)
      // You can show an error message, handle it in some way, etc.
    }
  };
  useEffect(() => {
    fetchPro();
    // Run the fetchPro function when the component mounts
  }, []);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isadd, setisadd] = useState(false);

  // ... (your existing functions)

  const see = (pro) => {
    console.log(pro);
    setSelectedProduct(pro);
  };

  const addPro = () => {
    setisadd(true);
  };
  return (
    <>
      {isProfile && (
        <div className="flex justify-center items-center h-screen">
          <div className="stats stats-vertical  shadow text-4xl">
            <div className="stat">
              <div className="stat-title">Total Products</div>
              <div className="stat-value">{products.length}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Total Registered Users</div>
              <div className="stat-value">
                {distributors.length + industries.length + admins.length}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Admins</div>
              <div className="stat-value">{admins.length}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Distributors</div>
              <div className="stat-value">{distributors.length}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Industries</div>
              <div className="stat-value">{industries.length}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
