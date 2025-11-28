import React, { useState, useEffect } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../../common/http";

const Edit = () => {
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // यहाँ id properly आनी चाहिए
  
  console.log("Category ID from URL params:", id); // Debug के लिए

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch category data on component mount
  useEffect(() => {
    const fetchCategory = async () => {
      // ID check करें
      if (!id || id === "${category.id}") {
        toast.error("Invalid category ID");
        navigate("/admin/categories");
        return;
      }

      try {
        console.log("Fetching category with ID:", id);
        const res = await fetch(`${apiUrl}/categories/${id}`, {
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
          } else if (result.category) {
            setValue("name", result.category.name);
            setValue("status", result.category.status.toString());
          } else if (result.name) {
            setValue("name", result.name);
            setValue("status", result.status.toString());
          } else {
            console.error("Unexpected response structure:", result);
            toast.error("Unexpected response format");
          }
        } else {
          toast.error(result.message || "Category not found");
          navigate("/admin/categories");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error("Error loading category");
        navigate("/admin/categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, navigate, setValue]);

  const updateCategory = async (data) => {
    setDisable(true);

    try {
      const res = await fetch(`${apiUrl}/categories/${id}`, {
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
        toast.success(result.message || "Category updated successfully");
        navigate("/admin/categories");
      } else if (result.status === 400) {
        if (result.errors) {
          Object.values(result.errors).forEach(errorArray => {
            errorArray.forEach(errorMessage => {
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
            <div className="h4 h4 pb-0 mb-0">Categories / Edit</div>
            <Link to="/admin/categories" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(updateCategory)}>
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