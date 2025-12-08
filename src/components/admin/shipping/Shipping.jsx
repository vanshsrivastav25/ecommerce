import React, { useState } from "react";
import Layout from "../../common/Layout";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";

const Shipping = () => {
  const [disable, setDisable] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      shipping_charge: "",
    },
  });

  // Load existing shipping charge automatically
  React.useEffect(() => {
    const fetchShipping = async () => {
      try {
        const res = await fetch(`${apiUrl}/get-shipping`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        });

        const result = await res.json();

        if (result.status === 200 && result.data) {
          // Prefill shipping charge
          reset({
            shipping_charge: result.data.shipping_charge || "",
          });
        }
      } catch (error) {
        console.error("Network error:", error);
        toast.error("Network error occurred");
      }
    };

    fetchShipping();
  }, [reset]);

  // Submit form
  const saveShipping = async (data) => {
    setDisable(true);

    try {
      const res = await fetch(`${apiUrl}/save-shipping`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setDisable(false);

      if (result.status === 200) {
        toast.success(result.message);
      } else if (result.status === 400) {
        // Show validation errors
        if (result.errors) {
          Object.values(result.errors).forEach((errorArray) => {
            errorArray.forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        }
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      setDisable(false);
      console.error("Network error:", error);
      toast.error("Network error occurred");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <div className="h4 h4 pb-0 mb-0">Shipping</div>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveShipping)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Shipping Charge
                    </label>
                    <input
                      {...register("shipping_charge", {
                        required: "The shipping charge field is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.shipping_charge ? "is-invalid" : ""
                      }`}
                      placeholder="Shipping Charge"
                    />
                    {errors.shipping_charge && (
                      <p className="invalid-feedback">
                        {errors.shipping_charge?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3 mb-4"
              >
                {disable ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
