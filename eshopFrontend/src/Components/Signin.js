import { useRef } from "react";
import axios from "axios";
import Webapis from "../Webapis/Webapis";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../redux-config/UserSlice";

export default function SignIn(){
    let emailInput = useRef();
    let passwordInput = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signInUser = async (event)=>{
    try{
        event.preventDefault();
        let email = emailInput.current.value;
        let password = passwordInput.current.value;
        let response = await axios.post(Webapis.SIGN_IN, {email, password});
        console.log(response.data);
        dispatch(saveUser(response.data));
        navigate("/");
    }
    catch(err){
        console.log(err);
        toast.error("Nahi pehchana bhai, tu kaun?");
    }
    }
    return<>
    <ToastContainer/>
    <div className="container d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
        <div className="sign-in-form" style={{width:"30%", boxShadow:"10px 10px 10px 10px grey"}}>
            <h5 className="bg-dark text-white text-center p-2">Sign In</h5>
            <form onSubmit={signInUser} className="p-3 d-flex flex-column align-items-center">
            <input ref={emailInput} type="text" placeholder="Enter your Email" className="mt-2 form-control"/>
            <input ref={passwordInput} type="password" placeholder="Enter you password" className="mt-2 form-control"/>
            <button type="submit" className="btn btn-secondary mt-2" style={{width:"100%"}}>Sign-In</button>
            <small className="text-primary mt-2" style={{cursor:"Pointer"}}><a href="sign-up">Create new account?</a></small>
        </form>
        </div>
    </div>
    </>

}