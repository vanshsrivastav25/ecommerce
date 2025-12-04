import React, { useEffect, useState } from "react";
import { apiUrl } from "./http";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  const featuredProducts = async () => {
    try {
      const res = await fetch(apiUrl + "/get-featured-products");
      const result = await res.json();
      setProducts(result.data || []);
    } catch (error) {
      console.log("Error fetching latest products:", error);
    }
  };

  useEffect(() => {
    featuredProducts();
  }, []);

  return (
    <section className="section-2 py-5">
      <div className="container">
        <h2>Featured Products</h2>

        <div className="row mt-4">
          {products.map((item) => (
            <div key={item.id} className="col-md-3 col-6">
              <div className="product-card border-0">
                <div className="card-img">
                  <img src={item.image_url} alt={item.title} className="w-10" />
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

export default FeaturedProducts;
