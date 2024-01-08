import { useDispatch, useSelector } from "react-redux"
import {
  changeBasketProductCount, 
  addToBasketAsync,
  removeFromBasketAsync
} from "../redux/productSlice";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  ButtonGroup,
  IconButton,
} from "@material-tailwind/react";
import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/24/solid";
 
export const BasketCard = ({
  id,
  product,
  count,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loadingRemoveBasket);

  const onChangeCount = (isIncrement) => {
    dispatch(changeBasketProductCount({_id: product._id, isIncrement}))
    const data = {
      id: product._id,
      count: isIncrement ? count + 1 : count -1,
    };
    dispatch(addToBasketAsync(data))
  }

  const handleRemoveBasket = () => {
    dispatch(removeFromBasketAsync({id}))
  }

  return (
    <Card className="h-full flex-col md:flex-row">
      <IconButton
        className='absolute right-2 top-2 md:right-3 md:top-3 z-10 '
        variant="text"
        disabled={loading}
        onClick={handleRemoveBasket} 
      >
        <XMarkIcon className="text-white md:text-gray-light h-6 w-6 min-w-6 min-h-6" />
      </IconButton>
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full md:w-2/5 h-full shrink-0 rounded-bl-none rounded-br-none md:rounded-bl-xl md:rounded-r-none md:relative"
      >
        <img
          className="h-full"
          src={product.image}
          alt="card-img"
        />
      </CardHeader>
      <CardBody className="w-full md:w-3/5 flex flex-col justify-between">
        <div className="flex flex-col">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              { product.name }
            </Typography>
          <Typography>
            { product.description }
          </Typography>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-6 md:mt-3 ">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            ${ product.price }
          </Typography>
          <ButtonGroup variant="outlined" size="sm" className="">
            <Button
              className="focus:shadow-none" 
              onClick={() => {
                if(count !== 1) {
                  onChangeCount(false)
                }
              }}
            >
              <MinusIcon className="text-gray-light h-4 w-4" />
            </Button>
            <Button
              className="focus:shadow-none text-sm" 
              variant="text"
            >
              {count}
            </Button>
            <Button
              className="focus:shadow-none" 
              onClick={() => onChangeCount(true)}
            >
              <PlusIcon className="text-gray-light h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>
      </CardBody>
    </Card>
  );
}