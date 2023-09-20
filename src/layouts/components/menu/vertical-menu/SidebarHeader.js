import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, X, Circle } from "react-feather";
import classnames from "classnames";
// import logo from "../../../../assets/img/logo/logomain.png";
import logo from "../../../../assets/img/logo/logowithoutback.png";
import { AiFillLeftCircle } from "react-icons/ai";

class SidebarHeader extends Component {
  render() {
    let {
      toggleSidebarMenu,
      activeTheme,
      collapsed,
      toggle,
      sidebarVisibility,
      menuShadow,
    } = this.props;
    return (
      <div className="navbar-header">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item">
            <NavLink to="/" className="navbar-brand">
              <div className="brand-logo mb-2 " />
              {/* <h2 className="brand-text mb-0">Deepak</h2> */}
              <img src={logo} alt="logo" width="160px" />
              {/* <h1 style={{ width: "100", color: "green" }}>FreshList</h1> */}
            </NavLink>
          </li>
          <li className="nav-item nav-toggle ">
            <div className="nav-link modern-nav-toggle">
              {collapsed === false ? (
                <AiFillLeftCircle
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    toggleSidebarMenu(true);
                    toggle();
                  }}
                  className={classnames(
                    "toggle-icon icon-x d-none d-xl-block font-medium-4",
                    {
                      "text-primary": activeTheme === "primary",
                      "text-success": activeTheme === "success",
                      "text-danger": activeTheme === "danger",
                      "text-info": activeTheme === "info",
                      "text-warning": activeTheme === "warning",
                      "text-dark": activeTheme === "dark",
                    }
                  )}
                  size={25}
                  data-tour="toggle-icon"
                />
              ) : (
                <ArrowRight
                  onClick={() => {
                    toggleSidebarMenu(false);
                    toggle();
                  }}
                  className={classnames(
                    "toggle-icon icon-x d-none d-xl-block font-medium-4",
                    {
                      "text-primary": activeTheme === "primary",
                      "text-success": activeTheme === "success",
                      "text-danger": activeTheme === "danger",
                      "text-info": activeTheme === "info",
                      "text-warning": activeTheme === "warning",
                      "text-dark": activeTheme === "dark",
                    }
                  )}
                  size={25}
                />
              )}
              <X
                onClick={sidebarVisibility}
                className={classnames(
                  "toggle-icon icon-x d-block d-xl-none font-medium-4",
                  {
                    "text-primary": activeTheme === "primary",
                    "text-success": activeTheme === "success",
                    "text-danger": activeTheme === "danger",
                    "text-info": activeTheme === "info",
                    "text-warning": activeTheme === "warning",
                    "text-dark": activeTheme === "dark",
                  }
                )}
                size={20}
              />
            </div>
          </li>
        </ul>
        <div
          className={classnames("shadow-bottom", {
            "d-none": menuShadow === false,
          })}
        />
      </div>
    );
  }
}

export default SidebarHeader;
