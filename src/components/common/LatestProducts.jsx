import React from 'react'
import eight from "../../assets/images/eight.jpg";

const latestproducts = () => {
  return (
    <div>
      <section className="section-2 py-5">
        <div className="container">
          <h2>New Arrivals</h2>
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="product-card border-0">
                <div className="card-img">
                  <img src={eight} alt="" className="w-10" />
                </div>

                <div className="card-body pt-3">
                  <a href="">Red Check Shirt for Mens</a>
                  <div className="price">$50 <span className="text-decoration-linr-through">$80</span></div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="product-card border-0">
                <div className="card-img">
                  <img src={eight} alt="" className="w-10" />
                </div>

                <div className="card-body pt-3">
                  <a href="">Red Check Shirt for Mens</a>
                  <div className="price">$50 <span className="text-decoration-linr-through">$80</span></div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="product-card border-0">
                <div className="card-img">
                  <img src={eight} alt="" className="w-10" />
                </div>

                <div className="card-body pt-3">
                  <a href="">Red Check Shirt for Mens</a>
                  <div className="price">$50 <span className="text-decoration-linr-through">$80</span></div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="product-card border-0">
                <div className="card-img">
                  <img src={eight} alt="" className="w-10" />
                </div>

                <div className="card-body pt-3">
                  <a href="">Red Check Shirt for Mens</a>
                  <div className="price">$50 <span className="text-decoration-linr-through">$80</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default latestproducts
