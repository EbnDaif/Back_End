import React, { useEffect } from "react";
 import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logoutuser } from "../redux/reducers/user";


function Header() {
  
  const dispatch =useDispatch()
    const user = useSelector((state) => state.counter.data);
    const islogin = useSelector((state) => state.counter.islogin);
  useEffect(() => {
    dispatch(fetchUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      <div className="topnav">
        {islogin && user.isAdmin && <Link to="/allblogs">allblogs</Link>}
        {islogin && (
          <>
            <Link to="/newblog">create blog</Link>
            <Link to="/myblogs">myblogs</Link>
          </>
        )}
        <div id="lform">
          {islogin && (
            <Link to='/' onClick={() => dispatch(logoutuser())}>logout</Link>
          )}
          {!islogin && (
            <>
              <Link to="/login">login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
};


export default Header;

