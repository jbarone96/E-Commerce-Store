import { MessageDisplay } from "@/components/common";
import { ProductShowcaseGrid } from "@/components/product";
import { useDocumentTitle, useScrollTop, useFeaturedProducts } from "@/hooks";
// import bannerImg from "@/images/bannerImg.png"
import React from "react";

const FeaturedProducts = () => {
  useDocumentTitle("Featured Product | Reactify");
  useScrollTop();

  const { featuredProducts, fetchFeaturedProducts, isLoading, error } =
    useFeaturedProducts();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Featured Products</h1>
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
                action={featuredProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={featuredProducts}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeaturedProducts;
