import { Stack } from "@chakra-ui/react";
import TopNav from "../../components/TopNav/TopNav";
import { useQuery } from "@tanstack/react-query";
import ProductPageLayout from "../../components/ProductList/ProductPageLayout";
import { wrappingsheetPage } from "../../query/queries";
import useUpdatecart from "../../hooks/useUpdatecart";

const WeddingGift = () => {
  //useUpdatecart();

  const { data, isLoading } = useQuery(["wrappingsheet"], wrappingsheetPage);

  return (
    <TopNav>
      <Stack justify="center" mt="10">
        <ProductPageLayout data={data} isLoading={isLoading} />
      </Stack>
    </TopNav>
  );
};

export default WeddingGift;
