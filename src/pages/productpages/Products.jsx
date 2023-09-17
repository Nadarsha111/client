import ProductPageLayout from "../../components/ProductList/ProductPageLayout";
import TopNav from "../../components/TopNav/TopNav";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
import {  Stack } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
const Products = () => {


  const { data, loading,error } = useFetch("/products?populate=*");




  // const {
  //   data: pic,
  //   isLoading,
  //   isError,
  // } = useQuery(["productpage"], () =>
  //   makeRequest
  //     .get(`/products?populate=*`)
  //     .then((response) => response.data)
  // );
  // if (isError) {
  //   return <div>Something went wrong</div>;
  // }
  
  return (
    <TopNav>
      <Stack justify="center" mt="10">
        <ProductPageLayout data={data} isLoading={loading} />

      </Stack>
    </TopNav>
  );
};
export default Products;
