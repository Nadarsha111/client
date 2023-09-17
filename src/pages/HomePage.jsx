import { Box, Button, Card, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import TopNav from "../components/TopNav/TopNav";
import HomeBanner from "../components/home/HomeBanner";
import ProductPageLayout from "../components/ProductList/ProductPageLayout";
import useFetch from "../hooks/useFetch";

const HomePage = () => {
  const { data: homePagemap, error: homepagemap } = useFetch(
    "/catagories?fields[0]=title&fields[1]=description&populate[0]=img"
  );
  const { data: homeproducts, error: homeproductFetchError } = useFetch(
    "/products?populate=*"
  );

  if (homeproductFetchError || homepagemap) {
    return <div>Something went wrong in home</div>;
  }

  return (
    <TopNav>
      <Stack spacing="0" overflowX="hidden">
        <HomeBanner />
        <Stack py={["15px","80px"]}>
          <SimpleGrid
            columns={{
              base: "2",
              md: "2",
              lg: "4",
              xl: "4",
            }}
            px={["1", ""]}
            gap={["2", "5"]}
            alignSelf="center"
          >
            {homePagemap &&
              homePagemap.map((page) => (
                <Box key={page.id} position="relative">
                  <Card
                    w={{
                      base: "150px",
                      md: "300px",
                      lg: "230px",
                      xl: "300px",
                    }}
                    h={["160px", "260px"]}
                    bgImage={`url(${import.meta.env.VITE_REACT_API_UPLOAD_URL}${
                      page?.attributes?.img?.data?.attributes?.url
                    })`}
                    bgSize="cover"
                    bgPosition="center"
                    borderRadius="20px"
                  />
                  <Box
                    left="0"
                    right="0"
                    bottom="10px"
                    zIndex="1"
                    position="absolute"
                    textAlign="center"
                  >
                    <Text
                      fontSize="24px"
                      fontWeight="500"
                      color="white"
                      margin="16px"
                      textAlign={"center"}
                    >
                      {page.attributes.title}
                    </Text>
                    <Text
                      fontSize="md"
                      fontWeight="400"
                      color="white"
                      margin="16px"
                      display={{ base: "none", md: "block" }}
                    >
                      {page.attributes.description}
                    </Text>
                  </Box>
                </Box>
              ))}
          </SimpleGrid>
        </Stack>
        <Stack>
          <Box
            textAlign="center"
            fontSize="42px"
            fontWeight="500"
            color="black"
            margin="16px"
          >
            <Text>Popular Gift Collection</Text>
          </Box>
          {/* isLoading={isLoading} */}
          <ProductPageLayout data={homeproducts} />
          <Box align="center" mt="10">
            <Button
              bgColor="#263A45"
              color="white"
              fontSize="16px"
              fontWeight="400"
            >
              View All
            </Button>
          </Box>
          <Box w="full" mt="10">
            <Box align="center">
              <Text fontSize="42" fontWeight="500">
                We Don’t Just Send Gifts. We Deliver Happiness.
              </Text>
              <Box>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. industry’s standard dummy text ever since the 1500s,
              </Box>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </TopNav>
  );
};

export default HomePage;
