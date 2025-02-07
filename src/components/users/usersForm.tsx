import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import * as UsersActions from "./usersActions";

import { NotificationContainer } from "../../pages/notificationContainer";
import { notification } from "../../pages/notificationContainer/notification";

const UserForm: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.usersData);

  const [firstInit, setFirstInit] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Inactive");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (id) {
      setFirstInit(true);
    }
  }, [id]);

  useEffect(() => {
    dispatch(UsersActions.getUserRoleRequest());

    if (firstInit && typeof id !== "undefined" && id !== null && id !== "") {
      setIsEditMode(true);
      dispatch(UsersActions.getUserDetailsRequest(id));
    }
  }, [firstInit, id]);

  useEffect(() => {
    if (users?.userDetails && isEditMode) {
      const user = users.userDetails;
      setValue("name", user.name || "-");
      setValue("email", user.email || "-");
      setValue("dob", user.dob || "-");
      setValue("role", user.role?.name || "-");
      setSelectedRole(user.role?.name || "");
      const genderValue = user.gender === "0" ? "female" : "male";
      setValue("gender", genderValue);
      setValue("status", user.status === "1");
      setStatusMessage(user.status_text || "Inactive");
    }
  }, [users, isEditMode, setValue]);

  useEffect(() => {
    if (users?.resEditUser !== undefined && !users.isUserEdit) {
      notification(
        users?.resEditUser?.message ?? "Update Successfully!",
        "success"
      );
      dispatch(UsersActions.getUserDetailsRequest(id));
      dispatch({
        type: UsersActions.ActionTypes.USER_EDIT_SUCCESS,
        resEditUser: undefined,
      });
    }
    if (users?.resEditUser === undefined && users.errors !== undefined) {
      notification(users?.errors?.message, "error");
      dispatch({
        type: UsersActions.ActionTypes.USER_EDIT_FAILURE,
        errors: undefined,
      });
    }
  }, [users?.resEditUser, users.isUserEdit, users.errors]);

  useEffect(() => {
    if (users?.resAddUser !== undefined && !users.isUserAdd) {
      notification(
        users?.resAddUser?.message ?? "Create User Successfully!",
        "success"
      );
      dispatch({
        type: UsersActions.ActionTypes.USER_ADD_SUCCESS,
        resAddUser: undefined,
      });
      reset();
    }
    if (users?.resAddUser === undefined && users.error !== undefined) {
      notification(users?.error?.message, "error");
      dispatch({
        type: UsersActions.ActionTypes.USER_ADD_FAILURE,
        error: undefined,
      });
    }
  }, [users?.resAddUser, users.isUserAdd, users.error]);

  const onSubmit = (data: any) => {
    const gender = data.gender === "female" ? "0" : "1"; // Female = 0, Male = 1
    const status = data.status ? "1" : "0"; // Active = 1, Inactive = 0

    // Find the role_id from the selected role
    const selectedRole = users?.userRole?.find(
      (role: any) => role.name === data.role
    );
    const role_id = selectedRole ? selectedRole.id : null;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("role_id", role_id);
    formData.append("dob", data.dob);
    formData.append("gender", gender);
    formData.append("status", status);

    if (data.profile && data.profile[0]) {
      formData.append("profile", data.profile[0]);
    }

    if (data.galleries && data.galleries.length > 0) {
      Array.from(data.galleries).forEach((file: File) => {
        formData.append("user_galleries[]", file);
      });
    }

    if (data.pictures && data.pictures.length > 0) {
      Array.from(data.pictures).forEach((file: File) => {
        formData.append("user_pictures[]", file);
      });
    }

    if (isEditMode) {
      formData.append("id", id);
      dispatch(UsersActions.editUsersRequest(formData));
    } else {
      formData.append("password", data.password);
      dispatch(UsersActions.addUsersRequest(formData));
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setStatusMessage("Active");
    } else {
      setStatusMessage("Inactive");
    }
  };

  const validateFileSize = (file: File) => {
    const maxSize = 4 * 1024 * 1024; // 4MB in bytes
    if (file.size > maxSize) {
      return "File size exceeds 4MB";
    }
    return true;
  };

  const handleClear = () => {
    reset();
    setStatusMessage("Inactive");
  };

  return (
    <>
      <div className="container mt-4">
        <h4 className="mb-4">
          {isEditMode ? "Update Admin User" : "Create Admin User"}
        </h4>
        <form
          className="p-4 border rounded shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Name*</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name?.message && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label">Email*</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                disabled={isEditMode}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email?.message && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            {!isEditMode && (
              <>
                <div className="col-md-6">
                  <label className="form-label">Password*</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    disabled={isEditMode}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password should be at least 6 characters",
                      },
                      maxLength: {
                        value: 12,
                        message: "Password should not exceed 12 characters",
                      },
                    })}
                  />
                  {errors.password?.message && (
                    <span className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </>
            )}
            <div className="col-md-6">
              <label className="form-label">Role*</label>
              <select
                className="form-select"
                {...register("role", { required: "Role is required" })}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">All Roles</option>
                {users?.userRole?.map((role: any) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">DOB*</label>
              <input
                type="date"
                className="form-control"
                {...register("dob", { required: "Date of birth is required" })}
              />
              {errors.dob?.message && (
                <span className="text-danger">{errors.dob.message}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label">Profile*</label>
              <input
                type="file"
                className="form-control"
                accept="image/jpeg, image/png, image/jpg, image/gif, image/svg"
                {...register("profile", {
                  required: !isEditMode ? "Profile is required" : false,
                  validate: validateFileSize,
                })}
              />
              {errors.profile?.message && (
                <span className="text-danger">{errors.profile.message}</span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Gender*</label>
              <div>
                <input
                  type="radio"
                  value="female"
                  {...register("gender", { required: "Gender is required" })}
                  id="female"
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  value="male"
                  {...register("gender", { required: "Gender is required" })}
                  id="male"
                  className="ms-2"
                />
                <label htmlFor="male">Male</label>
              </div>
              {errors.gender?.message && (
                <span className="text-danger">{errors.gender.message}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label">Status*</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  {...register("status")}
                  id="status"
                  onChange={handleStatusChange}
                />
                <label className="form-check-label" htmlFor="status">
                  {statusMessage}
                </label>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">User Galleries*</label>
              <input
                type="file"
                className="form-control"
                accept="image/jpeg, image/png, image/jpg, image/gif, image/svg"
                {...register("galleries", {
                  required: !isEditMode ? "User Galleries are required" : false,
                  validate: validateFileSize,
                })}
                multiple
              />
              {errors.galleries?.message && (
                <span className="text-danger">{errors.galleries.message}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label">User Pictures*</label>
              <input
                type="file"
                className="form-control"
                accept="image/jpeg, image/png, image/jpg, image/gif, image/svg"
                {...register("pictures", {
                  required: !isEditMode ? "User Pictures are required" : false,
                  validate: validateFileSize,
                })}
                multiple
              />
              {errors.pictures?.message && (
                <span className="text-danger">{errors.pictures.message}</span>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary me-2"
              disabled={!isValid && !isEditMode}
            >
              {users?.isUserEdit || users?.isUserAdd ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : isEditMode ? (
                "Update"
              ) : (
                "Submit"
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <NotificationContainer />
    </>
  );
};

export default UserForm;
