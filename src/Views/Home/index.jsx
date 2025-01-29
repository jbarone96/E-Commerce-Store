import { ArrowRightOutlined } from "@ant-design/icons";
import { MessageDisplay } from "../../Components/Common";
import { ProductShowcaseGrid } from "../../Components/Product";
import {
  FEATURED_PRODUCTS,
  RECOMMENDED_PRODUCTS,
  SHOP,
} from "../../Constants/routes";
import {
  useDocumentTitle,
  useFeaturedProducts,
  useRecommendedProducts,
  useScrollTop,
} from "../../Hooks";
// import bannerImg from "@/images/bannerImg"
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useDocumentTitle("Reactify | Home");
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useFeaturedProducts(6);

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended,
  } = useRecommendedProducts(6);

  return (
    <main className="content">
      <div className="home">
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              The &nbsp;
              <strong>Ultimate</strong>
              &nbsp; Shopping Experience
            </h1>
            <p>Reactify is your one stop shop for anything and everything!</p>
            <br />
            <Link to={SHOP} className="button">
              Shop Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="display">
            <div className="display-header">
              <h1>Featured Products</h1>
              <Link to={FEATURED_PRODUCTS}>Shop All</Link>
            </div>
            {errorFeatured && isLoadingFeatured ? (
              <MessageDisplay
                message={errorFeatured}
                action={fetchFeaturedProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={featuredProducts}
                skeletonCount={6}
              />
            )}
          </div>
          <div className="display">
            <div className="display-header">
              <h1>Recommended Products</h1>
              <Link to={RECOMMENDED_PRODUCTS}>Shop All</Link>
            </div>
            {errorRecommended && isLoadingRecommended ? (
              <MessageDisplay
                message={errorRecommended}
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

export default Home;
