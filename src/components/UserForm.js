import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button, FormLabel } from "react-bootstrap";


const UserForm = (props) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
  });

  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <FormLabel htmlFor="username">Name</FormLabel>
            <Field
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter your username"
            />
            <ErrorMessage
              name="username"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Field
              name="email"
              type="text"
              className="form-control"
              placeholder="Enter your email"
            />
            <ErrorMessage
              name="email"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Field
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="image">Image</FormLabel>
            <Field
              name="image"
              type="text"
              className="form-control"
              placeholder="Upload your image"
            />
            <ErrorMessage
              name="image"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <Button variant="danger" size="lg" block type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;

