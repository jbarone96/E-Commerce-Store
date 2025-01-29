import { MessageDisplay } from "../../Components/Common";
import { ProductShowcase } from "../../Components/Product";
import { useDocument, useScroll, useFeaturedProducts } from "../../Hooks";
// import bannerImg from "@/images/bannerImg.png"
import React from "react";

const FeaturedProducts = () => {
  useDocument("Featured Product | Reactify");
  useScroll();

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
              <ProductShowcase products={featuredProducts} skeletonCount={6} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeaturedProducts;
