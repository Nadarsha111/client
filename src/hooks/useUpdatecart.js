import { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeRequestWithToken } from "../makeRequest";

const useUpdatecart = () => {
  const { cartId, products } = useSelector((state) => state.cart);
  const jwt = useSelector((state) => state.auth.user.jwt);
  useEffect(() => {
    if (!jwt) {
      return;
    }
    const updateCart = async () => {
      const { data } = await makeRequestWithToken(jwt).put(`/carts/${cartId}`, {
        data: {
          mycart: products,
        },
      });
      return data;
    };
    updateCart();
  }, [cartId, products, jwt]);

  return { products, cartId };
};

export default useUpdatecart;
