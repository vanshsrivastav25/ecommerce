import React from "react";
import eight from "../../assets/images/eight.jpg";

const LatestProducts = () => {
  const products = [
    { id: 1, title: "Red Check Shirt for Mens", price: 50, oldPrice: 80 },
    { id: 2, title: "Red Check Shirt for Mens", price: 50, oldPrice: 80 },
    { id: 3, title: "Red Check Shirt for Mens", price: 50, oldPrice: 80 },
    { id: 4, title: "Red Check Shirt for Mens", price: 50, oldPrice: 80 },
  ];

  return (
    <section className="section-2 py-5">
      <div className="container">
        <h2>New Arrivals</h2>

        <div className="row mt-4">
          {products.map((item) => (
            <div key={item.id} className="col-md-3 col-6">
              <div className="product-card border-0">
                <div className="card-img">
                  <img src={eight} alt={item.title} className="w-10" />
                </div>

                <div className="card-body pt-3">
                  <a href="#">{item.title}</a>
                  <div className="price">
                    ${item.price}{" "}
                    <span className="text-decoration-line-through">
                      ${item.oldPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LatestProducts;
