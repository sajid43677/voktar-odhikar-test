import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import RemoveIndustryFromRedList from "./RemoveIndustryFromRedList";

export default function RedListedIndustry() {
    const headerColumns = ["", "Name", "Reason", "Issuer",, ""];
  const [allredlistedindustry, setAllRedListedIndustry] = useState({});
  const [isRedListedIndustry, setRedListedIndustry] = useState(false);
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
        process.env.NEXT_PUBLIC_API_End + "admin/redlistedindustry/",
        { withCredentials: true }
      );

      console.log(res);
      if (res.status >= 200 && res.status < 300) {

        console.log(res.data);
        setAllRedListedIndustry(res.data);
        console.log(allredlistedindustry);
        setRedListedIndustry(true);
      }
    } catch (error) {
      console.log(
        error.hasOwnProperty("response")
          ? error.response.data.message
          : error.message
      );
    }
  };
  useEffect(() => {
    fetchPro();
  }, []);

  const [selectedIndustry, setselectedIndustry] = useState(null);
  const see = (pro) => {
    console.log(pro);
    setselectedIndustry(pro);
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
                  {isRedListedIndustry &&
                    allredlistedindustry.map(
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
                                {content.reason}
                                <br />
                                <span className="badge badge-ghost badge-sm"></span>
                            </td>
                            <td>
                                {content.issuer}
                                <br />
                                <span className="badge badge-ghost badge-sm"></span>
                            </td>
                            <th>
                              <button
                                className="btn btn-ghost btn-xs"
                                onClick={() => see(content, content.redlistedserialnumber)}
                              >
                                Remove From Red List
                              </button>
                            </th>
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
              <RemoveIndustryFromRedList Industry={selectedIndustry}></RemoveIndustryFromRedList>
            </div>
          )}
        </div>
      </div>
    </>
  );
}