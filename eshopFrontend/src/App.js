import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategory } from "./redux-config/CategorySlice";
import Product from "./Components/Product";
import Header from "./Components/Header";
import SignIn from "./Components/Signin";
import SignUp from "./Components/Signup";
import ViewCart from "./Components/ViewCart";
import Auth from "./Components/Auth";
// import Footer from "./Components/Footer";

function App(){
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchCategory());
  }, []);
  return <>
   <Header/><span></span>
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/view-cart" element={<Auth><ViewCart/></Auth>}/>
      </Routes>
    </div>
    {/* <Footer/> */}
  </>
}
export default App;