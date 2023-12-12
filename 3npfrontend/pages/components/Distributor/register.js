import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
      region: "",
      phone: "",
      LicenseNum: "",
    },
    mode: "all",
  });
  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors, isDirty } = formState;

  const onSubmit = async (data) => {
    const userData = {
      name: data.Name,
      email: data.Email,
      address: data.region,
      phone_number: data.phone,
      role: data.Role,
      password: data.Password,
      region: data.region,
      license_number: data.LicenseNum,
      message: "",
    };
    console.log("Form submitted", userData);

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_End + "distributor/addDistributor/",
        userData
      );
      console.log(res.data);
      if (res.data.message === "") {
        alert("profile created");
        router.push("/");
      } else alert(res.data.message);
    } catch (error) {
      console.log(error);
      //console.log(res);
    }

    //reset();
  };

  console.log({ isDirty });

  useEffect(() => {
    const subs = watch((val) => {
      console.log(val);
    });
    return () => subs.unsubscribe();
  }, [watch]);

  return (
    <>
      <div className="">
        <h2 className="text-xl font-semibold mb-6 text-center text-slate-900">
          Sign Up
        </h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg text-slate-900">
                    What is your name?
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
                    Email
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.Email?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="text"
                  id="Email"
                  {...register("Email", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                      notDefault: (fd) => {
                        return (
                          fd !== "john@email.com" ||
                          "Default email cannot be used"
                        );
                      },
                      emailPattarn: (fd) => {
                        return (
                          /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(fd) ||
                          "Invalid email"
                        );
                      },
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.Email?.message}
                  </span>
                </div>
              </label>
            </div>
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
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg text-slate-900">
                    Confirm Password
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.ConfirmPass?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="password"
                  id="ConfirmPass"
                  {...register("ConfirmPass", {
                    validate: {
                      checkGivenPass: (fd) => {
                        return (
                          watch("Password") === fd ||
                          "Do not match the given password"
                        );
                      },
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.ConfirmPass?.message}
                  </span>
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
                    License Number
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.LicenseNum?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="text"
                  id="LicenseNum"
                  {...register("LicenseNum", {
                    required: "Name cannot be empty",
                    pattern: {
                      value: /^AUTH-\d{12}$/,
                      message:
                        'License number must start with "AUTH-" followed by 12 digits',
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.LicenseNum?.message}
                  </span>
                </div>
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg text-slate-900">
                    Role
                  </span>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Admin</span>
                    <input
                      className="radio checked:bg-base"
                      type="radio"
                      id="admin"
                      value="Admin"
                      {...register("Role", {
                        required: "Select a role",
                      })}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Distributor</span>
                    <input
                      className="radio checked:bg-blue-300"
                      type="radio"
                      id="distributor"
                      value="Distributor"
                      {...register("Role", {
                        required: "Select a role",
                      })}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Industry</span>
                    <input
                      className="radio checked:bg-blue-300"
                      type="radio"
                      id="industry"
                      value="Industry"
                      {...register("Role", {
                        required: "Select a role",
                      })}
                    />
                  </label>
                </div>
                <div className="label">
                  <span className="label-text-alt">{errors.Role?.message}</span>
                </div>
              </label>
            </div>
            <div>
              {isDirty && (
                <button className="btn btn-outline mx-auto w-full">
                  Sign Up
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
