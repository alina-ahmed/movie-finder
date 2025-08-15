import React from "react";
import { Outlet } from "react-router";
import ScrollToTop from "./ScrollToTop";

function Layout() {
  return (
    <>
      <Outlet />
      <ScrollToTop />
    </>
  );
}

export default Layout;