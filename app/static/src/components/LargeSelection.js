import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, createSearchParams } from "react-router-dom";
import axios from "axios";

const LargeSelection = ({ title, id, manualCode, eventHandler }) => {
  let navigate = useNavigate();

  let [roomNotFound, setRoomNotFound] = useState(false);

  // Handle form submission
  const validate = (values) => {
    const errors = {};
    if (!values.code) {
      errors.code = "Required";
    } else if (values.code.length !== 6) {
      errors.code = "Must be 6 digits";
    }

    if (!values.nickname) {
      errors.nickname = "Required";
    } else if (values.nickname.length >= 15) {
      errors.nickname = "Must be less than 15 characters";
    }

    return errors;
  };

  // create formik hook
  const formik = useFormik({
    initialValues: {
      code: "",
      nickname: "",
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      axios
        .get("/flask/api/room")
        .then((response) => {
          var exists = response["data"][values.code];
          if (exists) {
            setRoomNotFound(false);
            navigate({
              pathname: "/waiting",
              search: `?${createSearchParams(formik.values)}`,
            });
          } else {
            setRoomNotFound(true);
            setSubmitting(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  // Create submit button
  return (
    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
      <div className="col-lg-4 col-md-6 col-sm-6 col-12">
        <div className="features-small-item">
          <div className="icon">
            <i>
              <img
                src={require("../images/" + id + ".png")}
                height="100%"
                width="100%"
                alt=""
              />
            </i>
          </div>
          <h4 className="features-title">{title}</h4>
          <div className="col-12">
            <form id={id} action="">
              <input
                style={{ visibility: !manualCode && "hidden" }}
                name="code"
                type="text"
                placeholder="Code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.submitCount > 0 && formik.errors.code ? (
                <div className="error features-small-item">
                  {formik.errors.code}
                </div>
              ) : null}
              {roomNotFound === true ? (
                <div className="error features-small-item">
                  {"Unable to find room"}
                </div>
              ) : null}
              <input
                style={{ visibility: !manualCode && "hidden" }}
                name="nickname"
                type="text"
                placeholder="Nickname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.submitCount > 0 && formik.errors.nickname ? (
                <div className="error features-small-item">
                  {formik.errors.nickname}
                </div>
              ) : null}
              <button
                type="submit"
                id={id}
                className={
                  formik.isSubmitting ? "main-button-frozen" : "main-button"
                }
                onClick={(!manualCode && eventHandler) || formik.handleSubmit}
                disabled={formik.isSubmitting}
              >
                {title + " Room"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LargeSelection;
