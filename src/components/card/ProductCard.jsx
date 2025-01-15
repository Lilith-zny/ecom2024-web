// rafce

import React from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion, useSpring } from "framer-motion";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <div className="border rounded-md shadow-md p-2 w-48">
        <div>
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              className="rounded-md w-full h-24 object-cover hover:scale-110 hover:duration-200"
            />
          ) : (
            <div className="w-full h-24 bg-gray-100 rounded-md text-center flex items-center justify-center shadow-md">
              No Image
            </div>
          )}
        </div>
        <div className="py-2">
          <p className="text-xl truncate">{item.title}</p>
          <p className="text-sm text-gray-500 truncate">{item.description}</p>
        </div>
        <div className="flex justify-between px-2 items-center">
          <span className="text-sm font-bold text-gray-500">
            {numberFormat(item.price)}
          </span>
          <button
            onClick={() => actionAddtoCart(item)}
            className="bg-gray-100 p-2 rounded-md hover:bg-gray-300 hover:text-white hover:duration-200 shadow-md"
          >
            <ShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
