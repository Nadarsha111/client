import {
  Card,
  CardBody,
  Button,
  HStack,
  Stack,
  Text,
  Image,
  Heading,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartControl";
import { useNavigate } from "react-router-dom";
import { changeINPrice, formatPrice } from "../../hooks/priceRealated";

const ProductCard = ({ value, title, price, oldprice, id, desc }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (event) => {
    event.stopPropagation();
    dispatch(
      addToCart([{
        id: id,
        title: title,
        desc: desc,
        price: price,
        img: value,
        oldprice: oldprice,
        quantity: 1,
      }])
    );
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      maxW="260px"
      h="375px"
      bg="white"
      borderRadius="20px"
      variant="elevated"
      shadow="lg"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }} // Set cursor to indicate clickability
    >
      <CardBody p="0" align="center" position="relative">
        <div style={{ position: "relative" }}>
          {/* Overlay to prevent clicks on the button */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              pointerEvents: "none",
            }}
          ></div>

          <Image
            src={`${import.meta.env.VITE_REACT_API_UPLOAD_URL}${value}`}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            objectFit="cover"
            w="255px"
            h="260px"
          />
          <Stack spacing="2" align="center" mt="5">
            <Heading fontSize="16px" fontWeight="500" >
              {title}
            </Heading>
            <HStack
              spacing="3"
              bg=""
              justify="space-between"
              // w="full"
              px="6"
              align={["center","end"]}
            >
              <Stack gap="0">
                {" "}
                <Text fontWeight="500" fontSize="16px" align={["center","start"]}>
                  {formatPrice(price, "INR")}
                </Text>
                <Flex gap="1">
                  <Text as="s" fontSize="12px" color="grey">
                    {formatPrice(oldprice || price + 20, "INR")}
                  </Text>
                  <Text fontSize="xs" color="green">
                    {changeINPrice(price, oldprice || price + 20)}
                  </Text>
                </Flex>
              </Stack>
              <Button
                display={{ base: "none", md: "flex" }}
                variant="outline"
                fontWeight="500"
                size="sm"
                borderColor="#263A45"
                fontSize="sm"
                overflow="clip"
                onClick={handleAddToCart}
                style={{ zIndex: 2 }}
              >
                Add to cart
              </Button>
            </HStack>
          </Stack>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
