import ProductPageLayout from "../../components/ProductList/ProductPageLayout";
import TopNav from "../../components/TopNav/TopNav";
import { Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { productpage } from "../../query/queries";
const Products = () => {
  const { data, isLoading } = useQuery(["productpage"], productpage);

  return (
    <TopNav>
      <Stack justify="center" mt="10">
        <ProductPageLayout data={data} isLoading={isLoading} />
      </Stack>
    </TopNav>
  );
};
export default Products;
