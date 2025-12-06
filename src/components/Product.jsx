import React, { useContext, useEffect, useState } from "react";
import Layout from "./common/Layout";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Rating } from "react-simple-star-rating";

import { apiUrl } from "./common/http";
import { CartContext } from "./context/Cart";
import { toast } from "react-toastify";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [sizeSelected, setSizeSelected] = useState(null);
  const params = useParams();
  const { addToCart } = useContext(CartContext);

  const fetchProduct = () => {
    fetch(`${apiUrl}/get-product/${params.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setProduct(result.data);
          setProductImages(result.data.product_images);
          setProductSizes(result.data.product_sizes);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  const handleAddToCart = () => {
    
    if (productSizes.length > 0) {
      if (sizeSelected == null) {
        toast.error("Please select a size");
      } else {
        addToCart(product, sizeSelected);
        toast.success("Product added to cart!");
      }
    } else {
      addToCart(product, null);
      toast.success("Product added to cart!");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Layout>
      <div className="container product-detail">
        {/* Breadcrumb */}
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.title}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <div className="row mb-5">
          {/* Thumbnails & Main Image Section */}
          <div className="col-md-5">
            <div className="row">
              {/* Thumbs Small */}
              <div className="col-2">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  direction="vertical"
                  spaceBetween={10}
                  slidesPerView={5}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {productImages && productImages.map((product_image) => {
                      return (
                        <SwiperSlide key={`image-sm-${product_image.id}`}>
                          <img
                            src={product_image.image_url}
                            className="w-100"
                            alt=""
                          />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>

              {/* Main Slider Large */}
              <div className="col-10">
                <Swiper
                  loop={true}
                  navigation={true}
                  spaceBetween={0}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {productImages && productImages.map((product_image) => {
                      return (
                        <SwiperSlide key={`image-${product_image.id}`}>
                          <img
                            src={product_image.image_url}
                            className="w-100"
                            alt=""
                          />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Product Content */}
          <div className="col-md-7">
            <h2>{product.title}</h2>

            {/* Ratings */}
            <div className="d-flex">
              <Rating size={20} readonly initialValue={rating} />
              <span className="pt-1 ps-2">10 Reviews</span>
            </div>

            {/* Price */}
            <div className="price h4 py-3">
              ${product.price} &nbsp;
              {product.compare_price && (
                <span className="text-decoration-line-through">
                  ${product.compare_price}
                </span>
              )}
            </div>

            {/* Short Description */}
            <div>{product.short_description}</div>

            {/* Sizes */}
            <div className="pt-3">
              <strong>Select Size</strong>
              <div className="sizes d-flex gap-2 pt-2">
                {productSizes && productSizes.map((product_size) => {
                    return (
                      <button
                        key={`p-size-${product_size.id}`}
                        onClick={() => setSizeSelected(product_size.size.name)}
                        className={`btn btn-size me-2 ${sizeSelected == product_size.size.name ? 'active' :  ''}`}>
                        {product_size.size.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Add To Cart */}
            <div className="add-to-cart my-3">
              <button
                onClick={() => handleAddToCart()}
                className="btn btn-primary text-uppercase"
              >
                Add To Cart
              </button>
            </div>

            <hr />

            <div>
              <strong>SKU</strong> {product.sku}
            </div>
          </div>
        </div>

        {/* Description & Reviews */}
        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="description" title="Description">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </Tab>

              <Tab eventKey="reviews" title="Reviews (10)">
                Reviews Area
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
