import { useCallback, useState } from "react";
import useCartStore from "../store/cartStore";
import CartItem from "../components/cart-item";

const Cart = () => {
  const { cart, removeFromCart, changeQuantity, totalPrice } =
    useCartStore();

  return (
    <>
      <div className="flex grow flex-row items-start">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-between w-full my-5">
              <h1 className="font-bold text-base sm:text-xl xl:text-3xl text-purple-950">
                Shopping Cart
              </h1>

              <span className="font-bold text-base sm:text-xl xl:text-3xl text-gray-700">Total: ${totalPrice.toFixed(2)}</span>
            </div>

            {cart.length > 0 && 
              <>
              
                <div className="grid grid-cols-1 gap-4 w-full">
                  {cart.map((product) => (
                    <CartItem key={product.id} product={product} />
                  ))}
                </div>
              </>
            }

            {cart.length === 0 && <>
              <div className="text-xl text-center bg-red-100 rounded-lg px-3 py-2">
                Please add some products to cart.
              </div>
            </>}

            <div className="flex flex-row items-center justify-between w-full my-5">
              <h1 className="font-bold text-base sm:text-xl xl:text-3xl text-purple-950">
                Shopping Cart
              </h1>

              <span className="font-bold text-base sm:text-xl xl:text-3xl text-gray-700">Total: ${totalPrice.toFixed(2)}</span>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Cart;
