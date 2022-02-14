import React, { useContext, useEffect } from "react";
// form validation 핸들링과 디자인 등을 도와주는 라이브러리
import { Formik, Form, Field, ErrorMessage } from "formik";
// form validation 핸들링을 도와주는 라이브러리, formik과 함께 자주 쓰인다.
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function CreatePost() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Write a fucking title if you want to post"),
    postText: Yup.string().required(
      "Where is fucking contents? don't you have eyes?"
    ),
  });
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };

  return (
    <>
      <div className="createPostPage">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="formContainer">
            <label>Title : </label>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="title"
              placeholder="(Ex. Title..)"
            />
            <label>Post : </label>
            <ErrorMessage name="postText" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="postText"
              placeholder="(Ex. Post..)"
            />

            <button type="submit">Create Post</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default CreatePost;
