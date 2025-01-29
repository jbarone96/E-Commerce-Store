import { useDidMount } from "../Hooks";
import { useEffect, useState } from "react";
import firebase from "../Services/firebase";

const useFeaturedProducts = (items) => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const didMount = useDidMount(true);

  const fetchFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      setError("");

      const docs = await firebase.getFeaturedProdcuts(items);

      if (docs.isEmpty) {
        if (didMount) {
          setError("No featured products found.");
          setIsLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setFeaturedItems(items);
          setIsLoading(false);
        }
      }
    } catch (error) {
      if (didMount) {
        setError("Failed to fetch featured products.");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (featuredItems.length === 0 && didMount) {
      fetchFeaturedProducts();
    }
  }, []);

  return {
    featuredItems,
    fetchFeaturedProducts,
    isLoading,
    error,
  };
};

export default useFeaturedProducts;
