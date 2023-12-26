import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Fileup() {
  const router = useRouter();
  const [backendError, setBackendError] = useState(null);

  const form = useForm({
    defaultValues: {
        license_number: "",
        verified:""
    },
    mode: "all",
  });
  const { register, handleSubmit, formState, watch, reset } = form;

  const { errors,isDirty } = formState;
  const licenseNumberPattern = /^AUTH-\d{12}$/;


  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    const userData = {
        filename: data.file_location_name,
      license_number: data.license_number,
      verified: data.type,
    };
    
    try {
        const formData = new FormData();
        formData.append('file_location_name', document.getElementById('file_name').files[0]);
        formData.append('license_number', userData.license_number);
        formData.append('verified', userData.verified);

        const res = await axios.post(
          process.env.NEXT_PUBLIC_API_End + "industry/uplodlicenseInd/",
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file upload
            },
          }
        );

      if (res.status >= 200 && res.status <= 300) {
        console.log(res.data);
        alert("Profile Verified SuccessFully");
      }
    } catch (error) {
      console.log(
        error.hasOwnProperty("response")
          ? error.response.data.message
          : error.message
      );
      setBackendError(
        error.hasOwnProperty("response")
          ? error.response.data.message
          : "An error occurred. Please try again."
      );
    }
  };
  console.log({ isDirty });

  useEffect(() => {
    const subs = watch((val) => {
      console.log(val);
    });
    return () => subs.unsubscribe();
  }, [watch]);


  return (
    <div>
    <h2 className="text-xl font-semibold mb-6 text-center text-white">
        Request for License Verification
        </h2>
        {backendError && (
      <div className="text-red-600 flex flex-col items-center" >{backendError}</div>
    )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <div className="form-control w-full max-w-md mb-4">
  <label className="label">
    <span className="label-text text-lg text-white">Upload File</span>
  </label>
  <input
  id="file_name"
  type="file"
  className="file-input"
  {...register('file_location_name', {
    required: 'Please upload a file',
    validate: {
      maxSize: (file) =>
        file[0]?.size <= 5 * 1024 * 1024 || 'File size must be less than 5MB',
      allowedTypes: (file) => {
        const acceptedExtensions = ['jpg', 'webp', 'png', 'jpeg', 'pdf'];
        const fileExtension = (file[0]?.name || '').split('.').pop().toLowerCase();
        return acceptedExtensions.includes(fileExtension)
          ? true
          : 'Invalid file type. Please upload a file of type: jpg, webp, png, jpeg, pdf';
      },
    },
  })}
/>
{/* <div className="label">
  <span className="label-text-alt text-red-600">
    {errors.file_location_name?.message ||
      'Invalid file type or size. Please upload a file of type: jpg, webp, png, jpeg, pdf and less than 5MB'}
  </span>
</div> */}

        </div>



        <div className="form-control w-full max-w-md mb-4">
        <label className="label">
            <span className="label-text text-lg text-white">License Number</span>
        </label>
        <input
            className="input input-bordered w-full bg-inherit text-white"
            type="text"
            placeholder="Type here"
            id="license_number"
            {...register("license_number", {
            validate: {
                notEmpty: (fd) => {
                return fd !== "" || "Field Cannot Be empty";
                },
                license_numberPattern: (fd) => {
                return (
                    /^AUTH-\d{12}$/.test(fd) ||
                    "Invalid license number format (should be AUTH-XXXXXXXXXXXX)"
                );
                },
            },
            })}
        />
            <div className="label">
            <span className="label-text-alt text-red-600">
                {errors.license_number?.message}
            </span>
            </div>
        </div>


        <div className="form-control w-full max-w-md mb-4">
            <label className="label">
            <span className="label-text text-lg text-white">Type</span>
            </label>
            <select
            className="select select-bordered w-full bg-inherit text-white"
            {...register("type", { required: "This field is required" })}
            >
            <option value="Yes">No</option>
            </select>
            <div className="label">
            <span className="label-text-alt text-red-600">
                {errors.type?.message}
            </span>
             </div>
        </div>



        <div className="mb-4">
            {isDirty && (
                <button className="btn btn-outline mx-auto w-full">
                  Submit
                </button>
              )}
        </div>
        </form>
    </div>
  );
}