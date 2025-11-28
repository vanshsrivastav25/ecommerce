import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";

const Edit = () => {
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // यहाँ id properly आनी चाहिए

  console.log("Brand ID from URL params:", id); // Debug के लिए

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch brand data on component mount
  useEffect(() => {
    const fetchBrand = async () => {
      // ID check करें
      if (!id || id === "${brand.id}") {
        toast.error("Invalid brand ID");
        navigate("/admin/brands");
        return;
      }

      try {
        console.log("Fetching brand with ID:", id);
        const res = await fetch(`${apiUrl}/brands/${id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        });

        console.log("Response status:", res.status);

        const result = await res.json();
        console.log("API Response:", result);

        if (res.ok) {
          // Different response structures handle करें
          if (result.data) {
            setValue("name", result.data.name);
            setValue("status", result.data.status.toString());
          } else if (result.brand) {
            setValue("name", result.brand.name);
            setValue("status", result.brand.status.toString());
          } else if (result.name) {
            setValue("name", result.name);
            setValue("status", result.status.toString());
          } else {
            console.error("Unexpected response structure:", result);
            toast.error("Unexpected response format");
          }
        } else {
          toast.error(result.message || "Brand not found");
          navigate("/admin/brands");
        }
      } catch (error) {
        console.error("Error fetching brand:", error);
        toast.error("Error loading brand");
        navigate("/admin/brands");
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [id, navigate, setValue]);

  const updateBrand = async (data) => {
    setDisable(true);

    try {
      const res = await fetch(`${apiUrl}/brands/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setDisable(false);

      if (result.status === 200 || res.ok) {
        toast.success(result.message || "Brand updated successfully");
        navigate("/admin/brands");
      } else if (result.status === 400) {
        if (result.errors) {
          Object.values(result.errors).forEach((errorArray) => {
            errorArray.forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        }
      } else {
        console.log("Something went wrong", result);
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      setDisable(false);
      console.error("Network error:", error);
      toast.error("Network error occurred");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mt-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <div className="h4 h4 pb-0 mb-0">Brands / Edit</div>
            <Link to="/admin/brands" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(updateBrand)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      {...register("name", {
                        required: "The name field is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Name"
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name?.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      {...register("status", {
                        required: "Please select a status",
                      })}
                      className={`form-control ${
                        errors.status ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">Select a Status</option>
                      <option value="1">Active</option>
                      <option value="0">Block</option>
                    </select>
                    {errors.status && (
                      <p className="invalid-feedback">
                        {errors.status?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3"
              >
                {disable ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
