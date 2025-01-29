import { LoadingOutlined } from "@ant-design/icons";
import { useDocumentTitle, useScrollTop } from "../../../Hooks";
import React, { lazy, Suspense } from "react";
import User from "../Components/User";

const UserAccount = lazy(() => import("../Components/UserAccount"));
const UserWishList = lazy(() => import("../Components/UserWishList"));
const UserOrders = lazy(() => import("../Components/UserOrders"));

const Loader = () => (
  <div className="loader" style={{ minHeight: "80vh" }}>
    <LoadingOutlined />
    <h6>Loading...</h6>
  </div>
);

const UserAcc = () => {
  useScrollTop();
  useDocumentTitle("My Account | Reactify");

  return (
    <User>
      <div index={0} label="Account">
        <Suspense fallback={<Loader />}>
          <UserAccount />
        </Suspense>
      </div>
      <div index={1} label="My Wish List">
        <Suspense fallback={<Loader />}>
          <UserWishList />
        </Suspense>
      </div>
      <div index={2} label="My Orders">
        <Suspense fallback={<Loader />}>
          <UserOrders />
        </Suspense>
      </div>
    </User>
  );
};

export default UserAcc;
