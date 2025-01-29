import { MessageDisplay } from "../../Components/Common";
import { ProductShowcaseGrid } from "../../Components/Product";
import {
  useDocumentTitle,
  useRecommendedProducts,
  useScrollTop,
} from "../../Hooks";
// import bannerImg from "@/images/bannerImg"
import React from "react";

const RecommendedProducts = () => {
  useDocumentTitle("Recommended Products | Reactify");
  useScrollTop();

  const { recommendedProducts, fetchRecommendedProducts, isLoading, error } =
    useRecommendedProducts();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Recommended Products</h1>
          </div>
          <div className="banner-img">
            <img src="" alt="" />
          </div>
        </div>
        <div className="display">
          <div className="product-display-grid">
            {error && !isLoading ? (
              <MessageDisplay
                message={error}
                action={fetchRecommendedProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={recommendedProducts}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecommendedProducts;
