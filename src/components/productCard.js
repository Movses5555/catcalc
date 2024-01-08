
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasketAsync,
  changeBasketSelectedProduct
} from "../redux/productSlice";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export const ProductCard = ({
  product,
  isList
}) => {
  const dispatch = useDispatch();
  const basketSelectedProduct = useSelector((state) => state.product.basketSelectedProduct);

  const addToBasket = () => {
    const data = {
      id: product._id,
      count: 1,
    };
    dispatch(changeBasketSelectedProduct(product._id))
    if(!basketSelectedProduct.includes(product._id)) {
      dispatch(addToBasketAsync(data))
    }
  }

  return (
    <Card className="h-full">
      <CardHeader color="blue-gray" className={`relative h-auto`}>
        <img
          src={product.image}
          alt="card-img"
        />
      </CardHeader>
      <CardBody className="px-4 flex justify-between">
        <Typography variant="h5" color="blue-gray" className="mb-2 break-words w-9/12">
          { product.name }
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2 w-3/12 text-end">
          ${ product.price }
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography>
          { product.description }
        </Typography>
        {
          !isList && (
            <Button
              color="blue"
              fullWidth 
              className="mt-4"
              onClick={ addToBasket }
            >
              Add to basket
            </Button>
          )
        }
      </CardFooter>
    </Card>
  )
}
