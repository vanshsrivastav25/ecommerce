import React, { useEffect, useState, useRef, useMemo } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../../common/http";
import JoditEditor from "jodit-react";
import { FaTrash } from "react-icons/fa";

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizesChecked, setSizesChecked] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const navigate = useNavigate();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const saveProduct = async (data) => {
    const formData = {
      ...data,
      description: content,
      gallery: gallery,
      sizes: sizesChecked,
    };

    console.log("FORM DATA SENDING:", formData);

    setDisable(true);

    const response = await fetch(`${apiUrl}/products`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setDisable(false);

    // Success
    if (result.status === 200) {
      toast.success(result.message);
      navigate("/admin/products");
      return;
    }

    // Error handling (fixed!)
    if (result.status === 400 && result.errors) {
      Object.keys(result.errors).forEach((field) => {
        setError(field, { message: result.errors[field][0] });
      });
    } else {
      toast.error("Something went wrong!");
      console.log("Full error:", result);
    }
  };

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.data);
      });
  };

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setBrands(result.data);
      });
  };

  const fetchSizes = async () => {
    console.log("SIZES API RESPONSE:", result);
    const res = await fetch(`${apiUrl}/sizes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setSizes(result.data);
      });
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    setDisable(true);

    const res = await fetch(`${apiUrl}/temp-images`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        // Update gallery IDs
        setGallery((prev) => [...prev, result.data.id]);

        // Update gallery image URLs for preview
        setGalleryImages((prev) => [...prev, result.data.image_url]);

        setDisable(false);

        e.target.value = "";
      });
  };

  const deleteImage = (image) => {
    const newGallery = galleryImages.filter((gallery) => gallery != image);
    setGalleryImages(newGallery);
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchSizes();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <div className="h4 h4 pb-0 mb-0">Product / Create</div>

            <Link to="/admin/products" className="btn btn-primary">
              Back
            </Link>
          </div>

          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      {" "}
                      Title *
                    </label>
                    <input
                      {...register("title", {
                        required: "The field is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      placeholder="Title"
                    />
                    {errors.title && (
                      <p className="invalid-feedback">
                        {errors.title?.message}
                      </p>
                    )}
                  </div>

                  <div className="row">
                    {/* Category */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Category *
                        </label>
                        <select
                          {...register("category", {
                            required: "The field is required",
                          })}
                          className={`form-control ${
                            errors.title ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select a Category</option>
                          {categories &&
                            categories.map((category) => {
                              return (
                                <option
                                  key={`category-${category.id}`}
                                  value={category.id}
                                >
                                  {category.name}
                                </option>
                              );
                            })}
                        </select>
                        {errors.category && (
                          <p className="invalid-feedback">
                            {errors.category?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Brands */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Brand
                        </label>
                        <select {...register("brand")} className="form-control">
                          <option value="">Select a Brand</option>
                          {brands &&
                            brands.map((brand) => {
                              return (
                                <option
                                  key={`brand-${brand.id}`}
                                  value={brand.id}
                                >
                                  {brand.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Short Description */}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>
                    <textarea
                      {...register("short_description")}
                      className="form-control"
                      placeholder="Short Description"
                      rows={3}
                    ></textarea>
                  </div>

                  {/* Description + JoditEditor */}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Description
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                    />
                  </div>

                  <h3 className="border-bottom mb-3">Pricing</h3>

                  <div className="row">
                    {/* Price */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Price *
                        </label>
                        <input
                          {...register("price", {
                            required: "The field is required",
                          })}
                          className={`form-control ${
                            errors.price ? "is-invalid" : ""
                          }`}
                          type="text"
                          placeholder="Price"
                        />
                        {errors.price && (
                          <p className="invalid-feedback">
                            {errors.price?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Discount Price */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Discounted Price
                        </label>
                        <input
                          {...register("compare_price")}
                          type="text"
                          placeholder="Discounted Price"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="border-bottom mb-3">Inventory</h3>

                  <div className="row">
                    {/* Sku */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          SKU *
                        </label>
                        <input
                          {...register("sku", {
                            required: "The field is required",
                          })}
                          className={`form-control ${
                            errors.sku ? "is-invalid" : ""
                          }`}
                          type="text"
                          placeholder="Sku"
                        />
                        {errors.sku && (
                          <p className="invalid-feedback">
                            {errors.sku?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Barcode */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Barcode
                        </label>
                        <input
                          {...register("barcode")}
                          type="text"
                          placeholder="Barcode"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {/* Qty */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          QTY
                        </label>
                        <input
                          {...register("qty")}
                          type="text"
                          placeholder="Qty"
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Status *
                        </label>
                        <select
                          {...register("status", {
                            required: "Please select a status",
                          })}
                          className={`form-control ${
                            errors.status ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select a Status</option>
                          <option value="1">Active</option>
                          <option value="0">Block</option>
                        </select>
                        {errors.status && (
                          <p className="invalid-feedback">
                            {errors.status?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Featured */}
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Featured
                      </label>
                      <select
                        {...register("is_featured", {
                          required: "Please select a status",
                        })}
                        className={`form-control ${
                          errors.is_featured ? "is-invalid" : ""
                        }`}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                      {errors.is_featured && (
                        <p className="invalid-feedback">
                          {errors.is_featured?.message}
                        </p>
                      )}
                    </div>

                    <h3 className="border-bottom mb-3">Sizes</h3>

                    {/* Sizes */}
                    <div className="mb-3">
                      {sizes &&
                        sizes.map((size) => {
                          return (
                            <div
                              className="form-check-inline ps-2"
                              key={size.id}
                            >
                              <input
                                {...register("sizes")}
                                checked={sizesChecked.includes(size.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSizesChecked([...sizesChecked, size.id]);
                                  } else {
                                    setSizesChecked(
                                      sizesChecked.filter(
                                        (sid) => size.id != sid
                                      )
                                    );
                                  }
                                }}
                                className="form-check-input"
                                type="checkbox"
                                value={size.id}
                                id={`size-${size.id}`}
                              />
                              <label
                                className="form-check-label ps-2"
                                htmlFor={`size-${size.id}`}
                              >
                                {size.name}
                              </label>
                            </div>
                          );
                        })}
                    </div>

                    <h3 className="border-bottom mb-3">Gallery</h3>

                    {/* Image */}
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Image
                      </label>
                      <input
                        onChange={handleFile}
                        type="file"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <div className="row g-3">
                        {galleryImages &&
                          galleryImages.map((image, index) => (
                            <div
                              className="col-md-3 image-card-wrapper"
                              key={`image-${index}`}
                            >
                              <div className="image-card">
                                <div className="image-number">{index + 1}</div>
                                <img
                                  src={image}
                                  alt={`Gallery ${index + 1}`}
                                  className="gallery-image"
                                />
                                <button
                                  className="delete-btn"
                                  onClick={() => deleteImage(image)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3 mb-5"
              >
                {disable ? "Creating..." : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
