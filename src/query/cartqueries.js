import { getuser } from "../constants/contants";
import { makeRequestWithToken } from "../makeRequest";


export const getCart = async (token) => {
  const { data } = await makeRequestWithToken(token).get(getuser);

  return data;
};

export const updateCart = async (token, cartid, cart) => {
  const { data } = await makeRequestWithToken(token).put(`/carts/${cartid}`, {
    data: {
      mycart: cart,
    },
  });
  console.log(data, "update cart");
  return data;
};
