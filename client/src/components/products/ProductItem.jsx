

import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    message.success("Ürün Sepete Eklendi.")
  };

  return (
    <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none p-2 h-80" onClick={handleClick}>

      <div className="product-img">
        <img
          src={item.img}
          alt=""
          className="h-44 object-cover w-full py-4 border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3 text-center gap-y-2">
        <div className='h-20'>
          <span className="font-medium text-md">{item.title}</span>

        </div>
        <span className="font-bold text-md">{formatPrice(item.price)} ₺</span>
      </div>
    </div>
  );
};

export default ProductItem;