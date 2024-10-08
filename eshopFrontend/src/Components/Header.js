import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutUser } from "../redux-config/UserSlice";

export default function Header() {
    let { categoryList } = useSelector((store) => store.Categories);
    let {isLoggedIn} = useSelector((store)=>store.User);
    const dispatch = useDispatch();
    const signOut = ()=>{
        dispatch(signOutUser());
    }
    return <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand" href="#"><b>E-</b><small className="text-danger">Shop</small></a>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/product">Products</a>
                </li>

                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                        Categories
                    </a>
                    <div className="dropdown-menu">
                    {categoryList.map((category, index) => <a key={index} className="dropdown-item" href="#">{category.name}</a>)}
                    </div>
                </li>
                <li className="nav-item">
                   {isLoggedIn ? "":<Link className="nav-link" to="/sign-in">Sign In</Link>} 
                </li>
                <li className="nav-item">
                    {isLoggedIn? "":<Link className="nav-link" to="/sign-up">Sign Up</Link>}
                </li>
                <li className="nav-item">
                    {isLoggedIn? <Link className="nav-link" to="/view-cart">View cart</Link>:""}
                </li>
                <li className="nav-item">
                    {isLoggedIn? <Link className="nav-link" onClick={signOut}>Sign out</Link>:""}
                </li>
                
            </ul>
        </nav>
    </>
}

