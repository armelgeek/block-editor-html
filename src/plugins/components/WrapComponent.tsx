import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const WrapComponent = ({ children }: any) => {
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    history.push("/login");
  };
  return (
    <div className="ms_main_wrapper ">
      <div className="ms_sidemenu_wrapper open_menu">
        <div className="ms_sidemenu_inner">
          <div className="ms_nav_wrapper">
            <ul>
              <li>
                <a href="index-2.html" className="active" title="Discover">
                  <span className="nav_icon">
                    <span className="icon icon_discover"></span>
                  </span>
                  <span className="nav_text">Accueil</span>
                </a>
              </li>
            </ul>
            <ul className="nav_downloads">
              <li>
                <a href="download.html" title="Downloads">
                  <span className="nav_icon">
                    <span className="icon icon_download"></span>
                  </span>
                  <span className="nav_text">downloads</span>
                </a>
              </li>
            </ul>
            <ul className="nav_playlist">
              <li>
                <a href="add_playlist.html" title="Create Playlist">
                  <span className="nav_icon">
                    <span className="icon icon_c_playlist"></span>
                  </span>
                  <span className="nav_text">create playlist</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ms_header">
        <div className="ms_top_left">
          <div className="ms_top_search">
            <input
              type="text"
              className="form-control"
              placeholder="Search Music Here.."
            />
            <span className="search_icon">
              <img src="./assets/images/svg/search.svg" alt="" />
            </span>
          </div>
          <div className="ms_top_trend">
           
          </div>
        </div>
        <div className="ms_top_right">
          <div className="ms_top_lang">
            <span data-bs-toggle="modal" data-bs-target="#lang_modal">
              languages <img src="./assets/images/svg/lang.svg" alt="" />
            </span>
          </div>
          <div className="ms_top_btn">
            {!state.isAuthenticated ? (
              <>
                <Link to={"/register"} className="ms_btn reg_btn">
                  <span>register</span>
                </Link>
                <Link to={"/login"} className="ms_btn login_btn">
                  <span>login</span>
                </Link>
              </>
            ) : (
              <>
                <Link className="ms_btn reg_btn" to="/songs/list">
                  Songs
                </Link>
                <Link to="/profile" className="ms_btn reg_btn">
                  Mon compte
                </Link>
                <a className="ms_btn login_btn" onClick={handleLogout}>
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="ms_content_wrapper  padder_top80">{children} </div>
    </div>
  );
};
export default WrapComponent;
