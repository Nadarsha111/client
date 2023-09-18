import { useState } from "react";
import {
  Box,
  Text,
  Image,
  Button,
  HStack,
  Stack,
  ButtonGroup,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsLightningCharge } from "react-icons/bs";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import TopNav from "../../components/TopNav/TopNav";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { changeINPrice, formatPrice } from "../../hooks/priceRealated";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartControl";

const Singleproduct = () => {
  const id = useParams().id;
  const { data: product } = useFetch(`/products/${id}?populate=*`);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  // console.log(product?.attributes?.catagories.data[0].attributes.title==="Photo Frames");

  // console.log(product?.attributes.slider.data[0].id)
  return (
    <TopNav>
      <HStack
        mt={{ base: "4", md: "14", lg: "16" }}
        px={{
          base: "2",
          sm: "6",
          md: "50",
          lg: "100",
          xl: "230",
        }}
        justify="space-between"
        flexDir={["column", "column", "row", "row"]}
      >
        <Box maxW="400">
          <Carousel showArrows={false} showStatus={false} showThumbs={false}>
            {product?.attributes.slider.data.map((image) => (
              <div key={image.id}>
                <Image
                  maxW="400px"
                  maxH="410px"
                  src={`${import.meta.env.VITE_REACT_API_UPLOAD_URL}${
                    image.attributes.url
                  }`}
                  alt="blue watch"
                />
              </div>
            ))}
          </Carousel>
        </Box>

        <Box
          h="410px"
          display="flex"
          flexDirection="column"
          justifyContent={["normal", "space-between"]}
          pt={["0", "6"]}
          pb="4"
        >
          <Stack ml="4" px="4">
            <Text
              // use the Badge component to display the product name and price
              fontSize="42px"
              fontWeight="500"
              color="black"
            >
              {product?.attributes?.title}
            </Text>

            <Text
              // use the Text component to display the product description
              mt={{ base: "", sm: "6" }}
              fontSize="md"
              maxW="450"
            >
              {product?.attributes?.desc}
            </Text>
            <Flex gap="2" align="end" mt={["3"]}>
              <Text fontWeight="500" fontSize="2xl">
                {formatPrice(product?.attributes.price, "INR")}
              </Text>
              <Text as="s" fontSize="sm" color="grey">
                {formatPrice(
                  product?.attributes.oldprice ||
                    product?.attributes.price + 20,
                  "INR"
                )}
              </Text>
              <Text fontSize="xs" color="green">
                {changeINPrice(
                  product?.attributes.price,
                  product?.attributes.oldprice || product?.attributes.price + 20
                )}
              </Text>
            </Flex>
            <Box
              display={"flex"}
              flexDir={["row"]}
              gap="14"
              justify="space-between"
              alignItems="flex-end"
              mt={["0", "3"]}
              mb="2"
            >
              <HStack>
                <IconButton
                  onClick={decrement}
                  bg="white"
                  size="sm"
                  variant={"outline"}
                  aria-label="Minus Button"
                  icon={<FiMinusCircle />}
                  w="14"
                />
                <Text fontSize="16px" fontWeight="500">
                  {count}
                </Text>
                <IconButton
                  size="sm"
                  w="14"
                  bg="white"
                  variant={"outline"}
                  aria-label="Plus Button"
                  icon={<FiPlusCircle />}
                  onClick={increment}
                />
              </HStack>
              {product?.attributes?.catagories.data[0].attributes.title ===
              "Photo Frames" ? (
                <Stack mt={["6", "0"]}>
                  <Text fontSize="16px" fontWeight="500">
                    Size:
                  </Text>
                  <ButtonGroup
                    size="sm"
                    gap="1"
                    variant="outline"
                    mt={["1", "2"]}
                  >
                    <Button>A3</Button>
                    <Button>A4</Button>
                  </ButtonGroup>
                </Stack>
              ) : (
                ""
              )}
            </Box>
          </Stack>

          <HStack
            gap={["", "8"]}
            ml={["0", "4"]}
            bg={["#263A45", "none"]}
            justify={["space-between", "normal"]}
            px={["10", "0"]}
            mt={["8", "0"]}
          >
            <Button
              bgColor="#263A45"
              color="white"
              fontSize="16px"
              fontWeight="400"
              size="lg"
              leftIcon={<AiOutlineShoppingCart size={"20px"} />}
              onClick={() => {
                dispatch(
                  addToCart([
                    {
                      id: product.id,
                      title: product.attributes.title,
                      desc: product.attributes.desc,
                      price: product.attributes.price,
                      img: product.attributes.img.data.attributes.url,
                      oldprice: product.attributes.oldprice,
                      quantity: count,
                    },
                  ])
                );
              }}
            >
              Add to Cart
            </Button>

            <Button
              bgColor="#263A45"
              color="white"
              colorScheme="yellow"
              fontSize="16px"
              fontWeight="400"
              leftIcon={<BsLightningCharge size={"20px"} />}
              size="lg"
            >
              Buy Now
            </Button>
          </HStack>
        </Box>
      </HStack>
    </TopNav>
  );
};

export default Singleproduct;
