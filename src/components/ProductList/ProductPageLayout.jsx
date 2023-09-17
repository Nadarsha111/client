import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const ProductPageLayout = ({ data, isLoading }) => {
  if (!data) {
    return null;
  }
  // console.log(data);
  return (
    <SimpleGrid
      columns={{
        base: "2",
        md: "2",
        lg: "3",
        xl: "4",
      }}
      gap={{
        base: "1",
        md: "12",
        lg: "5",
        xl: "5",
      }}
      alignSelf="center"
      px={["1",""]}
    >
      {data.map((value) => (
        <Skeleton key={value.id} isLoaded={!isLoading}>
          <ProductCard
            value={value?.attributes?.img?.data?.attributes?.url}
            id={value.id}
            title={value?.attributes?.title}
            price={value?.attributes?.price}
            oldprice={value?.attributes?.oldprice}
            desc={value?.attributes?.desc}
          />
        </Skeleton>
      ))}
    </SimpleGrid>
  );
};

export default ProductPageLayout;
