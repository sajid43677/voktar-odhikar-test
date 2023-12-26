import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/pages/utils/authcontext";

export default function RemoveDistributorFromRedList(props) {
  console.log(props.Distributor);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
        name: props.Distributor.name,
      reason: props.Distributor.reason,
      issuer: props.Distributor.issuer,
      redlistedserialnumber:props.Distributor.redlistedserialnumber,
    },

    mode: "all",
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;
  const [errch, seterrch] = useState("");
  const [updated, setupdated] = useState(false);
  const [isErr, setisErr] = useState(false);

  const { login } = useAuth();
  const onSubmit = async (data) => {
    const { redlistedserialnumber } = form.getValues();
    // const reason = {
    //     redlistedserialnumber: redlistedserialnumber,
    // };

    //console.log(reason);

    try {
      const res = await axios.delete(
        process.env.NEXT_PUBLIC_API_End +
        `admin/redlistdistributor?serialnumber=${props.Distributor.redlistedserialnumber}`,

        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status >= 200 && res.status < 300) {
        // Replace "/dashboard" with the actual URL
      }
    } catch (error) {
      console.log(error);
      //alert("Wrong Email or Password");

      seterrch(
        error.hasOwnProperty("response")
          ? Array.isArray(error.response.data.message)
            ? error.response.data.message[0]
            : error.response.data.message
          : error.message
      );
      setisErr(true);
      console.log(errch);
      
    }


    if (isErr === false) setupdated(true);
  };
  return (
    <>
      <div className="">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg">Name</span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.name?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="text"
                  id="name"
                  {...register("name", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                    },
                  })}
                  readOnly
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.name?.message || (isErr && errch)}
                  </span>
                </div>
              </label>
            </div>



            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg">Reason</span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.reason?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="text"
                  id="reason"
                  {...register("reason", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                    },
                  })}
                  readOnly
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.reason?.message || (isErr && errch)}
                  </span>
                </div>
              </label>
            </div>            


            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg">Issuer</span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.issuer?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="text"
                  id="issuer"
                  {...register("issuer", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                    },
                  })}
                  readOnly
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.issuer?.message || (isErr && errch)}
                  </span>
                </div>
              </label>
            </div>


            <div>
              <button className="btn btn-outline btn-xs">Remove From RedList</button>
            </div>
            <div>
              {updated && (
                <a className="text-sm  text-green-600">Distributor Removed From RedList</a>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}