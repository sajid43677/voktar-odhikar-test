import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/pages/utils/authcontext";

export default function EditProfile(props) {
  const router = useRouter();
  const Profile = props.profile;
  const form = useForm({
    defaultValues: {
      Name: Profile.name,
      Email: Profile.email,
      Password: "",
      region: Profile.region,
      phone: Profile.phone_number,
      LicenseNum: Profile.license_number,
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
    const userData = {
      name: data.Name,
      address: data.region,
      phone_number: data.phone,
      password: data.Password,
    };

    const regiondata = {
      region: data.region,
    };

    try {
      const res = await axios.patch(
        process.env.NEXT_PUBLIC_API_End + "user/updateuserprofile",
        userData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      console.log(res);
      const ress = await axios.patch(
        process.env.NEXT_PUBLIC_API_End + "user/updateregion",
        regiondata,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      console.log(ress);
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
      // Handle other errors (e.g., network issues, server errors)
      // You can show an error message, handle it in some way, etc.
    }
  };

  return (
    <>
      <div className="bg-base-500 flex items-center justify-center mt-4 mb-4">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg text-slate-900">
                    Name
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.Name?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="text"
                  id="Name"
                  {...register("Name", {
                    required: "Name cannot be empty",
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">{errors.Name?.message}</span>
                </div>
              </label>
            </div>

            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg text-slate-900">
                    Region
                  </span>
                </div>
                <select
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.region?.message ? "select-warning" : ""
                  }`}
                  name="region"
                  id="region"
                  {...register("region", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "Select Your Region" || "Select a region";
                      },
                      notEmpty2: (fd) => {
                        return fd !== "" || "Select a region";
                      },
                    },
                  })}
                >
                  <option disabled selected>
                    Select Your Region
                  </option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Barisal">Barisal</option>
                </select>
                <div className="label">
                  <span className="label-text-alt">
                    {errors.region?.message}
                  </span>
                </div>
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg text-slate-900">
                    Phone
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.phone?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="text"
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^01\d{9}$/,
                      message: "Invalid phone number format",
                    },
                    validate: {
                      minDigits: (fd) => {
                        return fd.length === 11 || "Enter valid number";
                      },
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.phone?.message}
                  </span>
                </div>
              </label>
            </div>
            {/* <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg">License</span>
                </div>
                <input
                  className="file-input file-input-bordered file-input-sm w-full max-w-xs bg-inherit"
                  type="file"
                  id="license"
                  {...register("license", {
                    required: "Select a file",
                    validate: {
                      validFileFormat: (fd) => {
                        return (
                          fd[0].type === "application/pdf" || "File must be pdf"
                        );
                      },
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.license?.message}
                  </span>
                </div>
              </label>
            </div> */}
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg text-slate-900">
                    Password
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.Password?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="password"
                  id="Password"
                  {...register("Password", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                      capLetterCheck: (fd) => {
                        return (
                          /[A-Z]/.test(fd) ||
                          "Password must contain a capital letter"
                        );
                      },
                      letterCheck: (fd) => {
                        return (
                          /[a-z]/.test(fd) ||
                          "Password must contain a lowercase letter"
                        );
                      },
                      digitCheck: (fd) => {
                        return (
                          /^(.*\d){2,}.*$/.test(fd) ||
                          "Password must contain atleast 2 numbers"
                        );
                      },
                      specialCharCheck: (fd) => {
                        return (
                          /^(.*[^a-zA-Z0-9]){2,}.*$/.test(fd) ||
                          "Password must contain atleast 2 special character"
                        );
                      },
                      minLength: (fd) => {
                        return (
                          fd.length >= 8 ||
                          "Password must contain atleast 8 character"
                        );
                      },
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.Password?.message}
                  </span>
                </div>
              </label>
            </div>
            <div>
              {
                <button className="btn btn-outline mx-auto w-full">
                  Update
                </button>
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
}