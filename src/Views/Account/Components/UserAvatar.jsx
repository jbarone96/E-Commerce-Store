import {
  DownOutlined,
  LoadingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ACCOUNT } from "@/constants/routes";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { signOut } from "@/redux/actions/authActions";

const UserAvatar = () => {
  const { profile, isAuthenticating } = useSelector((state) => ({
    profile: state.profile,
    isAuthenticating: state.app.isAuthenticating,
  }));

  const userNav = useRef(full);
  const dispatch = useDispatch();

  const toggleDropdown = (event) => {
    const closest = event.target.closest("div.user-nav");

    try {
      if (!closest && userNav.classList.contains("user-sub-open")) {
        userNav.current.classList.remove("user-sub-open");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", toggleDropdown);

    return () => document.removeEventListener("click", toggleDropdown);
  }, []);

  const onClickNav = () => {
    userNav.current.classList.toggle("user-sub-open");
  };

  return isAuthenticating ? (
    <div className="user-nav">
      <span>Signing Out</span>
      &nbsp;
      <LoadingOutlined />
    </div>
  ) : (
    <div
      className="user-nav"
      onClick={onClickNav}
      onKeyDown={() => {}}
      ref={userNav}
      role="button"
      tabIndex={0}
    >
      <h5 className="text-overflow-ellipsis">
        {profile.fullname && profile.fullname.split(" ")[0]}
      </h5>
      <div className="user-nav-img-wrapper">
        <img src={profile.avatar} alt="" className="user-nav-img" />
      </div>
      <DownOutlined style={{ fontSize: "1.2rem", marginLeft: "1rem" }} />
      <div className="user-nav-sub">
        {profile.role !== "ADMIN" && (
          <Link>
            View Account
            <UserOutlined />
          </Link>
        )}
        <h6
          className="user-nav-sub-link margin-0 d-flex"
          onClick={() => dispatch(signOut())}
          role="presentation"
        >
          Sign Out
          <LogoutOutlined />
        </h6>
      </div>
    </div>
  );
};

UserAvatar.propType = {
  profile: PropTypes.object.isRequired,
};

export default withRouter(UserAvatar);
