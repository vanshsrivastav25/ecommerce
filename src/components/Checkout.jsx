import React, { useState } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import ProductImg from "../assets/images/Mens/ten.jpg";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
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

        <div className="row">

          {/* Billing Details */}
          <div className="col-md-7">
            <h3 className="botter-bottom pb-3">
              <strong>Billing Details</strong>
            </h3>

            <form>
              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Name" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Email" />
                  </div>
                </div>

                <div className="mb-3">
                  <textarea className="form-control" rows={3} placeholder="Address"></textarea>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="City" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="State" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Zip Code" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Mobile" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Items & Payment */}
          <div className="col-md-5">

            <h3 className="botter-bottom pb-3">
              <strong>Items</strong>
            </h3>

            <table className="table align-middle">
              <tbody>

                <tr>
                  <td width="100">
                    <img src={ProductImg} width={80} alt="" />
                  </td>
                  <td width="600">
                    <h4 className="mb-1">Dummy Product Title</h4>
                    <div className="d-flex align-items-center pt-1">
                      <span className="fw-semibold">$10</span>
                      <button className="btn btn-size ms-3">S</button>
                      <div className="ps-5">X 1</div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td width="100">
                    <img src={ProductImg} width={80} alt="" />
                  </td>
                  <td width="600">
                    <h4 className="mb-1">Dummy Product Title</h4>
                    <div className="d-flex align-items-center pt-1">
                      <span className="fw-semibold">$10</span>
                      <button className="btn btn-size ms-3">S</button>
                      <div className="ps-5">X 1</div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>

            {/* Price Summary */}
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <div>Sub Total</div>
                  <div>$20</div>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <div>Shipping</div>
                  <div>$20</div>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <strong>Grand Total</strong>
                  <div>$20</div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <h3 className="botter-bottom pt-4 pb-3">
              <strong>Payment Method</strong>
            </h3>

            <div className="pt-2">
              <input
                type="radio"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={handlePaymentMethod}
              />
              <label className="form-label ps-2">Stripe</label>

              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
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
      </div>
    </Layout>
  );
};

export default Checkout;
