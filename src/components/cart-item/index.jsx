import useCartStore from "../../store/cartStore";

const CartItem = ({ product }) => {

  const { removeFromCart, changeQuantity } =
    useCartStore();

  return (
    <>
      <div
        className="bg-white p-4 rounded-lg shadow text-sm sm:text-base"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="mb-2 flex-shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-32 object-cover"
            />
          </div>
          <div className="sm:ms-4 flex flex-col grow w-full sm:w-2/3">
            <div className="mb-2 flex">
              <strong className="text-base truncate text-ellipsis">
                {product.title}
              </strong>
            </div>
            <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0">
              <div className="flex flex-row sm:flex-col sm:items-start items-center mb-4">
                <div className="flex flex-row items-center">
                  Quantity:
                  <input
                    className="ml-2 w-16 border border-gray-300 rounded-lg p-1"
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) =>
                      changeQuantity(product.id, parseInt(e.target.value, 10))
                    }
                  />
                </div>
              </div>
              <div>
                <button
                  className="bg-red-500 w-auto text-white text-sm sm:text-base py-1.5 sm:py-2 px-4 rounded-lg hover:bg-red-600"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div className="sm:ms-2 flex flex-row flex-shrink-0 text-end font-semibold text-sm sm:text-base">
            <span className="">Price:</span> ${product.price.toFixed(2)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
