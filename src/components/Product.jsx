import React, { useState } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Rating } from "react-simple-star-rating";

import ProductImgOne from "../assets/images/Mens/five.jpg";
import ProductImgTwo from "../assets/images/Mens/six.jpg";
import ProductImgThree from "../assets/images/Mens/seven.jpg";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);

  return (
    <Layout>
      <div className="container product-detail">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item" aria-current="page">
                  <Link to="/shop">Shop</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Dummy Product Title
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
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
                  <SwiperSlide>
                    <img src={ProductImgOne} className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={ProductImgTwo} className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={ProductImgThree} className="w-100" />
                  </SwiperSlide>
                </Swiper>
              </div>

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
                  <SwiperSlide>
                    <img src={ProductImgOne} className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={ProductImgTwo} className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={ProductImgThree} className="w-100" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <h2>Dummy Product Title</h2>
            <div className="d-flex">
              <Rating size={20} readonly initialValue={rating} />
              <span className="pt-1 ps-2">10 Reviews</span>
            </div>

            <div className="price h6 py-3">
              $20 <span className="text-decoration-line-through">$18</span>
            </div>

            <div>
              100% Original Products <br />
              Pay on delivery might be available <br />
              East 15 days returns and exchanges available.
            </div>

            <div className="pt-3">
              <strong>Select Size</strong>
              <div className="sizes d-flex gap-2 pt-2">
                <button className="btn btn-size">S</button>
                <button className="btn btn-size">M</button>
                <button className="btn btn-size">L</button>
                <button className="btn btn-size">XL</button>
              </div>
            </div>

            <div className="add-to-cart my-3">
              <button className="btn btn-primary text-uppercase">
                Add To Cart
              </button>
            </div>

            <hr />

            <div>
              <strong>SKU</strong>
              SKUUBB
            </div>
          </div>
        </div>

        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores totam cum repellendus! Officia, animi! Quaerat!
              </Tab>
              <Tab eventKey="profile" title="Reviews (10)">
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
