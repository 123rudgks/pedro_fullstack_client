import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
// form validation 핸들링을 도와주는 라이브러리, formik과 함께 자주 쓰인다.
import * as Yup from "yup";
import axios from 'axios';

function Registration() {
  const initialValues = {
    username: "",
    password:"",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });
  const onSubmit = (data)=>{
    axios.post("https://pedrotech-full-stack-blog.herokuapp.com/auth",data).then((response)=>{
      alert(response.data)
    })
  }
  return <div>
    <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="formContainer">
            <label>Username : </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="(Ex. Pedro..)"
            />
            <label>Password : </label>
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              id="inputCreatePost"
              name="password"
              placeholder="(Ex. Pedro..)"
            />
            <button type="submit">Register</button>
          </Form>
        </Formik>
  </div>;
}

export default Registration;
