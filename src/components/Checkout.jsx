import React, { useContext, useState } from "react";
import Layout from "./common/Layout";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./context/Cart";
import { useForm } from "react-hook-form";
import { apiUrl, userToken } from "./common/http";
import { toast } from "react-toastify";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cartData, subTotal, shipping, grandTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const processOrder = (data) => {
    console.log(data);
    if (paymentMethod == "cod") {
      saveOrder(data, "not paid");
    }
  };

  const saveOrder = (formData, paymentStatus) => {
    const newFormData = {
      ...formData,
      grand_total: grandTotal(),
      subtotal: subTotal(),
      shipping: shipping(),
      discount: 0,
      payment_status: paymentStatus,
      status: "pending",
      cart: cartData,
    };
    fetch(`${apiUrl}/save-order`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
      body: JSON.stringify(newFormData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          localStorage.removeItem('cart');
          navigate(`/order/confirmation/${result.id}`);
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <Layout>
      <div className="container pb-5">
        {/* Breadcrumb */}
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <form onSubmit={handleSubmit(processOrder)}>
          <div className="row">
            {/* Billing Details */}
            <div className="col-md-7">
              <h3 className="border-bottom pb-3">
                <strong>Billing Details</strong>
              </h3>

              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Name *"
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Email *"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <textarea
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    rows={3}
                    placeholder="Address *"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  ></textarea>
                  {errors.address && (
                    <div className="invalid-feedback">
                      {errors.address.message}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.city ? "is-invalid" : ""
                      }`}
                      placeholder="City *"
                      {...register("city", {
                        required: "City is required",
                      })}
                    />
                    {errors.city && (
                      <div className="invalid-feedback">
                        {errors.city.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.state ? "is-invalid" : ""
                      }`}
                      placeholder="State *"
                      {...register("state", {
                        required: "State is required",
                      })}
                    />
                    {errors.state && (
                      <div className="invalid-feedback">
                        {errors.state.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.zip ? "is-invalid" : ""
                      }`}
                      placeholder="Zip Code *"
                      {...register("zip", {
                        required: "Zip code is required",
                      })}
                    />
                    {errors.zip && (
                      <div className="invalid-feedback">
                        {errors.zip.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.mobile ? "is-invalid" : ""
                      }`}
                      placeholder="Mobile *"
                      {...register("mobile", {
                        required: "Mobile number is required",
                      })}
                    />
                    {errors.mobile && (
                      <div className="invalid-feedback">
                        {errors.mobile.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Items & Payment */}
            <div className="col-md-5">
              <h3 className="border-bottom pb-3">
                <strong>Items</strong>
              </h3>

              <table className="table">
                <tbody>
                  {cartData &&
                    cartData.map((item) => {
                      return (
                        <tr key={`cart-${item.id}`}>
                          <td width="100">
                            <img src={item.image_url} width={80} alt="" />
                          </td>
                          <td width="600">
                            <h4 className="mb-1">{item.title}</h4>
                            <div className="d-flex align-items-center pt-1">
                              <span className="fw-semibold">${item.price}</span>
                              <div className="ps-3">
                                {item.size && (
                                  <button className="btn btn-size ms-3">
                                    {item.size}
                                  </button>
                                )}
                              </div>
                              <div className="ps-5">X {item.qty}</div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              {/* Price Summary */}
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <div>Sub Total</div>
                    <div>${subTotal()}</div>
                  </div>

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <div>Shipping</div>
                    <div>${shipping()}</div>
                  </div>

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <strong>Grand Total</strong>
                    <div>${grandTotal()}</div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <h3 className="border-bottom pt-4 pb-3">
                <strong>Payment Method</strong>
              </h3>

              <div className="pt-2">
                <input
                  type="radio"
                  value="stripe"
                  defaultChecked={paymentMethod === "stripe"}
                  onChange={handlePaymentMethod}
                />
                <label className="form-label ps-2">Stripe</label>

                <input
                  type="radio"
                  value="cod"
                  defaultChecked={paymentMethod === "cod"}
                  onChange={handlePaymentMethod}
                  className="ms-3"
                />
                <label className="form-label ps-2">COD</label>
              </div>

              <div className="d-flex py-3">
                <button className="btn btn-primary">Pay Now</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
