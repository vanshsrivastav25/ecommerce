import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UserSidebar from "../common/UserSidebar";
import Layout from "../common/Layout";
import { apiUrl, userToken } from "../common/http";
import { toast } from "react-toastify";
import Loader from "../common/Loader";

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      fetch(`${apiUrl}/get-profile-details`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          reset({
            name: result.data.name || "",
            email: result.data.email || "",
            address: result.data.address || "",
            mobile: result.data.mobile || "",
            city: result.data.city || "",
            zip: result.data.zip || "",
            state: result.data.state || "",
          });
        }
      );
    },
  });

  const updateAccount = async (data) => {
    fetch(`${apiUrl}/update-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.message || "Profile updated successfully");
        } else {
          Object.keys(result.errors).forEach((field) => {
            setError(field, { message: result.errors[field][0] });
          });
        }
      })
      .catch(() => {
        toast.error("Network error");
      });
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <div className="h4 h4 pb-0 mb-0">My Account</div>
            {/* <Link to="#" className="btn btn-primary">
              Create
            </Link> */}
          </div>
          <div className="col-md-3">
            <UserSidebar />
          </div>
          <div className="col-md-9">
            {loading == true && <Loader />}
            {loading == false && (
              <form onSubmit={handleSubmit(updateAccount)}>
                <div className="card shadow mb-3">
                  <div className="card-body p-4">
                    <div className="row">
                      {/* Name */}
                      <div className="mb-3 col-md-6">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          {...register("name", {
                            required: "The name field is required.",
                          })}
                          type="text"
                          id="name"
                          className={`form-control ${
                            errors.name && "is-invalid"
                          }`}
                          placeholder="Enter Name"
                        />
                        <p className="text-danger">{errors.name?.message}</p>
                      </div>

                      {/* Email */}
                      <div className="mb-3 col-md-6">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          {...register("email", {
                            required: "The email field is required.",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          type="text"
                          id="email"
                          className={`form-control ${
                            errors.email && "is-invalid"
                          }`}
                          placeholder="Enter Email"
                        />
                        <p className="text-danger">{errors.email?.message}</p>
                      </div>

                      {/* Address */}
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <textarea
                          {...register("address", {
                            required: "The address field is required.",
                          })}
                          className={`form-control ${
                            errors.address && "is-invalid"
                          }`}
                          id="address"
                          placeholder="Enter Address"
                        />
                        <p className="text-danger">{errors.address?.message}</p>
                      </div>

                      {/* mobile */}
                      <div className="mb-3 col-md-6">
                        <label htmlFor="mobile" className="form-label">
                          Phone
                        </label>
                        <input
                          {...register("mobile", {
                            required: "The mobile field is required.",
                          })}
                          type="text"
                          id="mobile"
                          className={`form-control ${
                            errors.mobile && "is-invalid"
                          }`}
                          placeholder="Enter mobile"
                        />
                        <p className="text-danger">{errors.mobile?.message}</p>
                      </div>

                      {/* City */}
                      <div className="mb-3 col-md-6">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <input
                          {...register("city", {
                            required: "The city field is required.",
                          })}
                          type="text"
                          id="city"
                          className={`form-control ${
                            errors.city && "is-invalid"
                          }`}
                          placeholder="Enter City"
                        />
                        <p className="text-danger">{errors.city?.message}</p>
                      </div>

                      {/* Zip */}
                      <div className="mb-3 col-md-6">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          {...register("zip", {
                            required: "The zip field is required.",
                          })}
                          type="text"
                          id="zip"
                          className={`form-control ${
                            errors.zip && "is-invalid"
                          }`}
                          placeholder="Enter Zip"
                        />
                        <p className="text-danger">{errors.zip?.message}</p>
                      </div>

                      {/* State */}
                      <div className="mb-3 col-md-6">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <input
                          {...register("state", {
                            required: "The state field is required.",
                          })}
                          type="text"
                          id="state"
                          className={`form-control ${
                            errors.state && "is-invalid"
                          }`}
                          placeholder="Enter State"
                        />
                        <p className="text-danger">{errors.state?.message}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary mt-3 mb-5">Update</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
