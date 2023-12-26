import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AllDistributorName() {
    const headerColumns = ["", "Name", "Email", "Phone Number","Region", ""];
  const [alldistributor, setAllDistributor] = useState({});
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
        process.env.NEXT_PUBLIC_API_End + "industry/getalldistributor/",
        { withCredentials: true }
      );

      console.log(res);
      if (res.status >= 200 && res.status < 300) {

        console.log(res.data);
        setAllDistributor(res.data);
        console.log(alldistributor);
        setIsProfile(true);
      }
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

  const [selectedIndustry, setSelectedIndustry] = useState(null);

  // ... (your existing functions)

  const see = (pro) => {
    console.log(pro);
    setSelectedIndustry(pro);
  };
  return (
    <>
      <div>
        <div className="overflow-x-auto">
          {selectedIndustry == null && (
            <div class=" h-screen  w-full m-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="max-w-sm">
                  <div className="label">
                    <span className="label-text text-sm">Search Industry</span>
                  </div>
                  <div class="flex space-x-4">
                    <div class="flex rounded-md overflow-hidden w-full">
                      <input
                        class="input input-bordered w-full max-w-xs bg-inherit input-sm"
                        {...register("SearchData")}
                      />
                      <button class="btn btn-outline mx-auto btn-sm">Go</button>
                    </div>
                  </div>
                  <div className="label">
                    <span className="label-text-alt">
                      {errors.SearchData?.message}
                    </span>
                  </div>
                </div>
              </form>
              <table className="table table-xs table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                  <tr>
                    {headerColumns.map((column, index) => (
                      <th key={index} className="text-xl ">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {isProfile &&
                    alldistributor.map(
                      (content, index) =>
                        (!issearch ||
                          (typeof Sdata === "string" &&
                            content.name
                              .toLowerCase()
                              .includes(Sdata.toLowerCase())) ||
                          !Sdata) && (
                          <tr>
                            <th>{index + 1}</th>
                            <td>
                            <div className="flex items-center gap-3">
                            <div>
                                <div className="font-bold">
                                {content.name}
                            </div>
                            </div>
                            </div>
                            </td>
                            <td>
                                {content.email}
                                <br />
                                <span className="badge badge-ghost badge-sm"></span>
                            </td>
                            <td>
                                {content.phone_number}
                                <br />
                                <span className="badge badge-ghost badge-sm"></span>
                            </td>
                            <div className="flex items-center gap-3">
                            <td>
                                {content.region}
                                <br />
                                <span className="badge badge-ghost badge-sm"></span>
                            </td>
                            </div>
                            {/* <th>
                              <button
                                className="btn btn-ghost btn-xs"
                                onClick={() => see(content)}
                              >
                                RedList
                              </button>
                            </th> */}
                          </tr>
                        )
                    )}
                </tbody>
                {/* foot */}
              </table>
            </div>
          )}
          {selectedIndustry && (
            <div className="flex-grow bg-base-500 flex items-center justify-center mt-4 mb-4">
              <RedListtheDistributor Distributor={selectedIndustry}></RedListtheDistributor>
            </div>
          )}
        </div>
      </div>
    </>
  );
}