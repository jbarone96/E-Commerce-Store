import { MessageDisplay } from "../../Components/Common";
import { ProductShowcase } from "../../Components/Product";
import { useDocument, useRecommendedProducts, useScroll } from "../../Hooks";
// import bannerImg from "@/images/bannerImg"
import React from "react";

const RecommendedProducts = () => {
  useDocument("Recommended Products | Reactify");
  useScroll();

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
              <ProductShowcase
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
