import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      Name: "",
      Email: "john@email.com",
      Password: "",
      region: "",
      phone: "",
    },
  });
  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors, isDirty } = formState;

  const onSubmit = (data) => {
    console.log("Form submitted", data);
    if (watch("Role") === "Distributor") router.push("Distributor/distributor");
    reset();
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
        <h2 className="text-xl font-semibold mb-6 text-center">Sign Up</h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">What is your name?</span>
                </div>
                <input
                  className="input input-bordered w-full max-w-xs bg-inherit"
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
                  <span className="label-text">Email</span>
                </div>
                <input
                  className="input input-bordered w-full max-w-xs bg-inherit"
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
                  <span className="label-text">Password</span>
                </div>
                <input
                  className="input input-bordered w-full max-w-xs bg-inherit"
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
                          /\d/.test(fd) ||
                          "Password must contain a digit letter"
                        );
                      },
                      specialCharCheck: (fd) => {
                        return (
                          /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(fd) ||
                          "Password must contain a special character"
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
                  <span className="label-text">Confirm Password</span>
                </div>
                <input
                  className="input input-bordered w-full max-w-xs bg-inherit"
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
              {/* <label htmlFor="region">Region</label>

              <select
                name="region"
                id="region"
                {...register("region", {
                  validate: {
                    notEmpty: (fd) => {
                      return fd !== "" || "Select a region";
                    },
                  },
                })}
              >
                <option value=""></option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Barisal">Barisal</option>
              </select>
              <p>{errors.region?.message}</p> */}
            </div>
            <div>
              {/* <label htmlFor="phone">Phone</label>
              <input
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
              <p>{errors.phone?.message}</p> */}
            </div>
            <div>
              {/* <label htmlFor="license">License</label>
              <input
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
              <p>{errors.license?.message}</p> */}
            </div>
            <div>
              {/* <label htmlFor="Role">Role</label>
              <br />
              <input
                type="radio"
                id="admin"
                {...register("Role", {
                  required: "Select a role",
                })}
              />
              <label htmlFor="admin">Admin</label>
              <br />
              <input
                type="radio"
                id="distributor"
                {...register("Role", {
                  required: "Select a role",
                })}
              />
              <label htmlFor="distributor">Distributor</label>
              <br />
              <input
                type="radio"
                id="Vokta"
                {...register("Role", {
                  required: "Select a role",
                })}
              />
              <label htmlFor="vokta">Vokta</label>
              <p>{errors.Role?.message}</p> */}
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
