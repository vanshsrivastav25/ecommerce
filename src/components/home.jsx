import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/images/logo.png";
import LogoWhite from "../assets/images/logo-white.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SliderOneImg from "../assets/images/banner-1.jpg";
import SliderTwoImg from "../assets/images/banner-2.jpg";
import LatestProducts from "./common/LatestProducts";
import FeaturedProducts from "./common/FeaturedProducts";

const home = () => {
  return (
    <>
      <header className="shadow">
        <div className="bg-dark text-center">
          <span className="text-white">Your fashion partner</span>
        </div>

        <div className="container">
          <Navbar expand="lg" className="">
            <Navbar.Brand href="#">
              <img src={Logo} alt="" width={170} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
                <Nav.Link href="#action1">Mens</Nav.Link>
                <Nav.Link href="#action2">Womens</Nav.Link>
                <Nav.Link href="#action2">Kids</Nav.Link>
              </Nav>
              <div className="nav-right d-flex">
                <a href="" className="ms-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path>
                  </svg>
                </a>

                <a href="" className="ms-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="28"
                    fill="currentColor"
                    class="bi bi-bag"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path>
                  </svg>
                </a>
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>

      <section className="section-1">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          breakpoints={{
            1024: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          }}
        >
          <SwiperSlide>
            <div
              className="content"
              style={{ backgroundImage: `url(${SliderOneImg})` }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="content"
              style={{ backgroundImage: `url(${SliderTwoImg})` }}
            ></div>
          </SwiperSlide>
        </Swiper>
      </section>

      <LatestProducts />
      <FeaturedProducts />

      <footer className="py-5 text-white">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-3">
              <img src={LogoWhite} alt="" width={150} />
              <p className="pt-3 pe-5">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </p>
            </div>

            <div className="col-md-3">
              <h2 className="mb-3">Categories</h2>
              <ul>
                <li>
                  <a href="">Mens</a>
                </li>
                <li>
                  <a href="">Womens</a>
                </li>
                <li>
                  <a href="">Kids</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <h2 className="mb-3">Quick Links</h2>
              <ul>
                <li>
                  <a href="">Login</a>
                </li>
                <li>
                  <a href="">Womens</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <h2 className="mb-3">Get in touch</h2>
              <ul>
                <li>
                  <a href="">+91 12345 00000</a>
                </li>
                <li>
                  <a href="">Info@gmail.com</a>
                </li>
                <li>
                  <a href="">Address</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row spotlight py-5">
            <div className="col-md-4">
              <div className="d-flex justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-truck"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path>
                </svg>
                <h3 className="ps-2">Free Delivery</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-cash"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path>
                  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"></path>
                </svg>
                <h3 className="ps-2">Money Back Guarnte</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-credit-card-2-back"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"></path>
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"></path>
                </svg>
                <h3 className="ps-2">Secure Peyment</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-center pt-5">
              <p>&copy; 2025 All Right Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default home;
