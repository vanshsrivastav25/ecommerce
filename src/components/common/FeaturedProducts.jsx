import React, { useEffect, useState } from "react";
import { apiUrl } from "./http";
import { Link } from "react-router-dom";

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
          {products.map((product) => (
            <div key={product.id} className="col-md-3 col-6">
              <div className="product-card border-0">
                <div className="card-img">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-10"
                    />
                  </Link>
                </div>

                <div className="card-body pt-3">
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
                  <div className="price">
                    ${product.price} &nbsp;
                    {product.compare_price && (
                      <span className="text-decoration-line-through">
                        ${product.compare_price}
                      </span>
                    )}
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
