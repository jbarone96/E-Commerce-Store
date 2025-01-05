import { useDidMount } from "@/hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "@/services/firebase";

const useProducts = (id) => {
  const storeProduct = useSelector((state) =>
    state.products.items.find((item) => item.id === id)
  );

  const [product, setProduct] = useState(storeProduct);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    async () => {
      try {
        if (!product || product.id !== id) {
          setIsLoading(true);
          const doc = await firebase.getSingleProduct(id);

          if (doc.exists) {
            const data = { ...doc.data(), id: doc.ref.id };

            if (didMount) {
              setProduct(data);
              setIsLoading(false);
            }
          } else {
            setError("Product not found.");
          }
        }
      } catch (error) {
        if (didMount) {
          setIsLoading(false);
          setError(error?.message || "Something went wrong.");
        }
      }
    };
  }, []);

  return { product, isLoading, error };
};

export default useProducts;
