import React from "react";
import { withFormik, Form, Field } from "formik";

function LoginForm({ values }) {
    return (
      <div className = "loginForm">
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            <Field type="text" name="email" placeholder ="Email Address" />
            <Field type="text" name="password" placeholder="Password" />
            <label className="checkbox-container">
                Terms of Service
                <Field 
                    type="checkbox"
                    name="TOS"
                    checked={values.TOS}
                />
                <span className="checkmark" />
            </label>
            <button>Submit!</button>
        </Form>
      </div>
    )
};
const FormikLoginForm = withFormik({
mapPropsToValues({ name, email, password, TOS }){
    return{
        name: name || "",
        email: email || "",
        password: password || "",
        TOS: TOS || false
    }
}
})(LoginForm)

export default FormikLoginForm;