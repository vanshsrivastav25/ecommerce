import React, { useContext } from "react";
import Layout from "../common/Layout";
import { useForm } from "react-hook-form";
import { apiUrl } from "../common/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuth";

const Login = () => {
  const {login} = useContext(AdminAuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/admin/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      
      // Check response status before parsing
      if (!response.ok) {
        toast.error("Something went wrong — Status " + response.status);
        return;
      }

      const result = await response.json();
      console.log(result);

      if (result.status === 200) {
        const adminInfo =  {
          token: result.token,
          id: result.id,
          name: result.name
        }

        localStorage.setItem('adminInfo', JSON.stringify(adminInfo))

        login(adminInfo)

        navigate('/admin/Dashboard')

      } else {
        toast.error(result.message || "Invalid email or password");
      }

    } catch (error) {
      console.error(error);
      toast.error("Server Error, Please try again later");
    }
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0 Login">
            <div className="card-body p-4">
              <h3>Admin Login</h3>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  {...register("email", {
                    required: "The email field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="invalid-feedback">{errors.email?.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  {...register("password", { required: "The password field is required." })}
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="invalid-feedback">{errors.password?.message}</p>
                )}
              </div>

              <button className="btn btn-secondary w-100">Login</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );  
};

export default Login;
