import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import useLogout from "../../hooks/useLogout";
import NiceAvatar from "react-nice-avatar";
import "./Header.css";
import "./MergeStyles.css";

import {
  BiSun,
  BiMenu,
  BiSearch,
  BiHome,
  BiMap,
  BiNews,
  BiHeart,
  BiLogOut,
  BiLogIn,
  BiUser,
} from "react-icons/bi";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const { user } = useContext(AuthContext);
  const { setCityName } = useContext(DataContext);
  const { Logout } = useLogout();
  const navigate = useNavigate();

  // User Avatar From Database
  let avatar = user && user.user.avatar;

  function toggle() {
    setIsExpanded(!isExpanded);
  }
  // LOGOUT
  const logout = async () => {
    await Logout();
  };

  // search City of Header/Sidebar
  const handleChange = (e) => {
    setSearchCity(e.target.value);
  };

  const setCity = (e) => {
    e.preventDefault();
    if (searchCity !== "") {
      setCityName(searchCity);
      setSearchCity("");
      setIsExpanded(false);
      navigate("/");
    }
  };

  return (
    <>
      <i onClick={toggle} id="hamburger" className="bx i btn">
        <BiMenu />
      </i>

      <div className={isExpanded ? "sidebar-expand" : "sidebar-default"}>
        <div className="sidebar">
          <div className="logo-details">
            <div className="logo_name">Weather</div>
            <i className="i bx icon">
              <BiSun />
            </i>
          </div>
          <ul className="nav-list">
            <li>
              <i onClick={toggle} className="bx search i">
                <BiSearch />
              </i>
              <form onSubmit={setCity}>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleChange}
                  value={searchCity}
                />
              </form>
              <span className="tooltip">Search</span>
            </li>
            <li>
              <NavLink to="/">
                <i className="i bx">
                  <BiHome />
                </i>
                <span className="links_name">Dashboard</span>
              </NavLink>
              <span className="tooltip">Dashboard</span>
            </li>
            <li>
              <NavLink to="/map">
                <i className="i bx">
                  <BiMap />
                </i>
                <span className="links_name">Map</span>
              </NavLink>
              <span className="tooltip">Map</span>
            </li>

            <li>
              <NavLink to="/news">
                <i className="i bx">
                  <BiNews />
                </i>
                <span className="links_name">News</span>
              </NavLink>
              <span className="tooltip">News</span>
            </li>

            {user && user.user ? (
              <>
                <li>
                  <NavLink to="/favourites">
                    <i className="i bx">
                      <BiHeart />
                    </i>
                    <span className="links_name">Favourites</span>
                  </NavLink>
                  <span className="tooltip">Favourites</span>
                </li>

                <li className="profile">
                  <div className="profile-details">
                    {/* <img src="https://picsum.photos/200" alt="userImg" /> */}
                    <NiceAvatar
                      style={{
                        width: "2.81rem",
                        height: "2.81rem",
                        marginRight: ".625rem",
                      }}
                      {...avatar}
                    />
                    <div className="name_job">
                      <div className="name">{user.user.name}</div>
                      <div className="job">{user.user.email}</div>
                    </div>
                  </div>

                  <i onClick={logout} className="i bx log_out">
                    <BiLogOut />
                  </i>
                  <span className="tooltip">Map</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">
                    <i className="i bx ">
                      <BiLogIn />
                    </i>
                    <span className="links_name">Log In</span>
                  </NavLink>
                  <span className="tooltip">Login</span>
                </li>
                <li>
                  <NavLink to="/register">
                    <i className="i bx ">
                      <BiUser />
                    </i>
                    <span className="links_name">Register</span>
                  </NavLink>
                  <span className="tooltip">Register</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
