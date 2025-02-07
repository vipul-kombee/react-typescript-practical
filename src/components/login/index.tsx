import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../store/reducer";

import * as LoginActions from "./loginActions";

import { notification } from "../../pages/notificationContainer/notification";
import { NotificationContainer } from "../../pages/notificationContainer";

import { emailRegx } from "../../utils/conts";
import { DASHBOARD } from "../../global/routes";
import { Link } from "react-router-dom";

const Login: React.FC = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isredirect, setIsRedirect] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { signin, actions } = props;

  useEffect(() => {
    if (signin?.data !== undefined && !signin.isLogin) {
      notification(signin?.data?.message ?? "Login Successfully!", "success");
      setTimeout(() => {
        setIsRedirect(true);
      }, 2000);
      dispatch({
        type: LoginActions.ActionTypes.LOGIN_SUCCESS,
        data: undefined,
      });
    }
    if (signin?.data === undefined && signin.error !== undefined) {
      setIsRedirect(false);
      notification(signin?.error?.message, "error");
      dispatch({
        type: LoginActions.ActionTypes.LOGIN_FAILURE,
        error: undefined,
      });
    }
  }, [signin?.data, signin.isLogin, signin.error]);

  useEffect(() => {
    if (isredirect) {
      navigate(DASHBOARD);
    }
  }, [isredirect]);

  const onSubmit = (data: any) => {
    actions.loginRequest(data);
  };

  return (
    <>
      <div className="container-fluid vh-100 vw-100 d-flex flex-column flex-md-row p-0">
        {/* Left Side - Branding Section */}
        <div className="col-md-6 login-left-panel">
          <h1 className="fw-bold text-white">EASTERN</h1>
          <p className="welcome-text">Welcome to Eastern Techno Solutions!</p>
          <p className="footer-text">&copy; 2025 Eastern Techno Solutions</p>
        </div>

        {/* Right Side - Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white p-5">
          <div className="w-75">
            <h3 className="fw-bold text-center">Sign In</h3>
            <p className="text-muted text-center">
              Enter your username and password
            </p>
            <form>
              <div className="mb-3">
                <label className="form-label">Email*</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: emailRegx,
                      message: "Please Enter a valid Email.",
                    },
                  })}
                />
                {errors?.email?.type === "required" && (
                  <span className="text-danger">
                    {String(errors?.email?.message)}
                  </span>
                )}
                {errors?.email?.type === "pattern" && (
                  <span className="text-danger">
                    {String(errors?.email?.message)}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Password*</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required.",
                    maxLength: {
                      value: 6,
                      message: "Password should be at most 6 characters.",
                    },
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 characters.",
                    },
                  })}
                />
                {errors?.password?.type === "required" && (
                  <span className="text-danger">
                    {String(errors.password.message)}
                  </span>
                )}
                {errors?.password?.type === "minLength" && (
                  <span className="text-danger">
                    {String(errors.password.message)}
                  </span>
                )}
                {errors?.password?.type === "maxLength" && (
                  <span className="text-danger">
                    {String(errors.password.message)}
                  </span>
                )}
              </div>
              <div className="text-end mb-3">
                <Link to="forgotpassword" className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={handleSubmit(onSubmit)}
              >
                {signin?.data === undefined && signin?.isLogin ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  signin: state.signin,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(LoginActions as any, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
