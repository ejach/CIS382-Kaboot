import React from "react";
import { useFormik } from "formik";
import { useNavigate, createSearchParams } from "react-router-dom";

const CreateForm = () => {
  let navigate = useNavigate();

  // Handle form submission
  const validate = (values) => {
    const errors = {};
    if (!values.title || values.title.trim().length === 0) {
      errors.title = "Required";
    } else if (values.title.length > 20) {
      errors.title = "Must be 20 characters or less";
    }

    if (!values.points || values.points.trim().length === 0) {
      errors.points = "Required";
    } else if (isNaN(values.points) || values.points <= 0) {
      errors.points = "Must be a number greater than zero";
    }

    if (!values.time || values.time.trim().length === 0) {
      errors.time = "Required";
    } else if (isNaN(values.time) || values.time < 5 || values.time > 60) {
      errors.time = "Must be between 5 and 60 seconds";
    }

    return errors;
  };

  // create formik hook
  const formik = useFormik({
    initialValues: {
      title: "",
      points: "",
      time: "",
    },
    validate,
    onSubmit: (values) => {
      navigate({
        pathname: "/question",
        search: `?${createSearchParams(formik.values)}`,
      });
    },
  });

  // Create submit button
  return (
    <div className="features-wide-item">
      <h4 className="features-title">Create Exam</h4>

      <form onSubmit={formik.handleSubmit}>
        <div className="wide-row">
          <div className="col-lg">
            <input
              name="title"
              type="text"
              placeholder="Title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />

            {formik.touched.title && formik.errors.title ? (
              <div className="error">{formik.errors.title}</div>
            ) : null}
          </div>
        </div>

        <div className="wide-row">
          <div className="col-12">
            <input
              name="points"
              type="text"
              placeholder="Points"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />

            {formik.touched.points && formik.errors.points ? (
              <div className="error">{formik.errors.points}</div>
            ) : null}
          </div>

          <div className="col-12">
            <input
              name="time"
              type="text"
              placeholder="Question Time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />

            {formik.touched.time && formik.errors.time ? (
              <div className="error">{formik.errors.time}</div>
            ) : null}
          </div>
        </div>

        <div className="row">
          <button type="submit" id="create-exam" className="main-button">
            Create Exam
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
