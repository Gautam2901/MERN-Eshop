import axios from "axios";
import { useRef, useState } from "react";
import WebApis from "../Webapis/Webapis";
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  let imgRef = useRef();
  const [upload, setUpload] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [contact, setContact] = useState();

  const setImage = () => {
    setUpload(imgRef.current.files[0]);
  };

  const signUp = () => {
    let formData = new FormData();
    formData.append("profile", upload);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("contact", contact);
    axios.post(WebApis.SIGN_UP, formData)
      .then(response => {
        console.log(response.data);
        toast.success("Sign up successfully...");
      }).catch(err => {
        console.log(err);
        toast.error("Oops! something went wrong..");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="sign-up-form" style={{ width: "30%", boxShadow: "10px 10px 10px 10px grey" }}>
          <h5 className="bg-dark text-white text-center p-2">Sign Up</h5>
          <form className="p-3 d-flex flex-column align-items-center">
            <input
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              placeholder="Enter email id"
              className="mt-2 form-control"
            />
            <input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Enter password"
              className="mt-2 form-control"
            />
            <input
              onChange={(event) => setContact(event.target.value)}
              type="text"
              placeholder="Enter contact number"
              className="mt-2 form-control"
            />
            <input
              ref={imgRef}
              onChange={setImage}
              type="file"
              className="mt-2 form-control"
            />
            <button
              onClick={signUp}
              className="btn btn-secondary mt-2"
              style={{ width: "100%" }}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
