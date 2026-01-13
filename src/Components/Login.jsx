import { useFormik } from "formik";
import { useState } from "react";


const LogIn = () => {
    const [name,setName] = useState('');
    const formik = useFormik ({
        initialValues : {
            username: '',
            password: ''
        },
        onSubmit: values=>{
            setName(values.username)
            console.log(values.username+" "+values.password);
        }
    })
    return(
        <>
        <form onSubmit={formik.handleSubmit}>
            UserName:<input type="text" name="username" id="username" onChange={formik.handleChange} value={formik.values.username} /> <br/>
            Password: <input type="password" name="password" id="password" onChange={formik.handleChange} value={formik.values.password}></input>
            <button type="submit">Submit</button>
        </form>
        <h1>Welcome,{name}</h1>
        </>
    )
}
export default LogIn;