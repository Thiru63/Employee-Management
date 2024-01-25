import { Link } from "react-router-dom/dist";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/AuthReducer/action";


export const Navbar = () => {

  const state = useSelector(store => store.authReducer)
  const dispatch = useDispatch()
  console.log(state)

  const logot = () => {
    logout(dispatch)
  }

  return (
    <div className="nav" >
      <Link to='/'>
        <div >
          
          <h2
            style={{
              color: "#FF5722",
              fontFamily: "cursive",
              fontWeight: "800",
              margin: "5px 5px 0 10px",
            }}
          >
            Employee Management
          </h2>
        </div>
      </Link>

      <div className="nav-links">
        {(state.isAuth && state.token) ? <>
          
          <button onClick={logot}>Logout</button>
          
        </> : <>
          <Link to='/login'>
            <button className="button">
              Login
            </button>
          </Link>

        </>}



      </div>
    </div>
  );
};
