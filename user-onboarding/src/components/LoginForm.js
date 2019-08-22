import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ errors, touched, values, status }) {
    const [users, setUsers] = useState([]);
    useEffect(()=> {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
      <div className = "loginForm">
        <h1>User Form</h1>
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
            <p className="error">{errors.name}</p> 
             )}
            <Field type="email" name="email" placeholder ="Email Address" />
            {touched.email && errors.email && (
             <p className="error">{errors.email}</p> 
            )}
            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && (
             <p className="error">{errors.password}</p> 
             )}
            <label className="checkbox-container">
                Terms of Service
                <Field 
                    type="checkbox"
                    name="TOS"
                    checked={values.TOS}
                />
                <span className="checkmark" />
            </label>
            <Field component="select" className = "userSelect" name="selectBox">
            <option>Please Choose a Role</option>
            <option>Front-End Developer</option>    
            <option>Back-End Developer</option>    
            <option>Full-Stack Developer</option>    
            </Field>
            <button>Submit!</button>
        </Form>

        {users.map(user =>(
            <ul key = {user.id}>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Password: {user.password}</li>
                <li>Role: {user.selectBox}</li>
            </ul>
        ))}
      </div>
    )
};
const FormikLoginForm = withFormik({
mapPropsToValues({ name, email, password, TOS, selectBox }){
    return{
        name: name || "",
        email: email || "",
        password: password || "",
        TOS: TOS || false,
        selectBox: selectBox || ""
    };
},
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Try Again!").min(2, "Try again with your real name!"),
    email: Yup.string().required("Please Please Please put something in here").email("Try again with a valid email address!"),
    password: Yup.string().required("Make a password to avoid identity fraud").min(6, "Try again with a beefier password!")
  }),
  handleSubmit(values, {setStatus}) {
      axios
        .post("https://reqres.in/api/users", values)
        .then(response =>{
            setStatus(response.data)
            console.log(response)
        })
  }
})(LoginForm)

export default FormikLoginForm;