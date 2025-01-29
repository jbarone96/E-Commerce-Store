import { useDocument, useScroll } from "../../../Hooks";
import React from "react";

const Dashboard = () => {
  useDocument("Welcome | Reactify");
  useScroll();

  return (
    <div className="loader">
      <h2>Welcome to Admin Dashboard!</h2>
    </div>
  );
};

export default Dashboard;
