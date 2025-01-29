import { useDocumentTitle, useScrollTop } from "../../../Hooks";
import React from "react";

const Dashboard = () => {
  useDocumentTitle("Welcome | Reactify");
  useScrollTop();

  return (
    <div className="loader">
      <h2>Welcome to Admin Dashboard!</h2>
    </div>
  );
};

export default Dashboard;
