import { useEffect, useState } from "react";
import { useDidMount } from "@/hooks";
import firebase from "@/services/firebase";

const useRecommendedProducts = (itemCount) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const didMount = useDidMount(true);

  const fetchRecommendedProduct = async () => {
    try {
      setIsLoading(true);
      setError("");

      const docs = await firebase.getRecommendedProduct(itemCount);

      if (docs.empty) {
        if (didMount) {
          setError("No recommended products found.");
          setIsLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setRecommendedProducts(items);
          setIsLoading(false);
        }
      }
    } catch (error) {
      if (didMount) {
        setError("Failed to fetch recommended products.");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (recommendedProducts.length === 0 && didMount) {
      fetchRecommendedProduct();
    }
  }, []);

  return { recommendedProducts, fetchRecommendedProduct, isLoading, error };
};

export default useRecommendedProducts;
