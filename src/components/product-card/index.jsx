import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useCartStore from "../../store/cartStore";

const ProductCard = ({ product }) => {
  const { id, title, category, images, description, price } = product;

  const { addToCart } = useCartStore();
  const [currImage, setCurrentImage] = useState("");
  const [currIndex, setCurrentIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const alertMsg = "Thank you for your interest in our product.";

  const handleAddToCart = useCallback((e) => {
    addToCart({ ...product, quantity: qty }, qty);
    e.stopPropagation()
  }, [qty]);

  useEffect(() => {
    setCurrentImage(images[0]);
  }, [images]);

  return (
    <>
      {/* Product card */}
      <div
        className="flex rounded-xl bg-white shadow lg:shadow-lg"
        onClick={(e) => {
          alert(alertMsg);
          e.preventDefault();
        }}
      >
        <div className="flex flex-row w-full">
          {/* Image carousel */}
          <div
            className="relative pl-[30%] rounded-s-xl bg-cover bg-no-repeat bg-center z-0"
            style={{ backgroundImage: "url(" + currImage + ")" }}
          >
            <div className="absolute top-auto bottom-3 left-0 right-0">
              <div className="mx-auto w-10 flex flex-row align-middle items-center justify-between space-x-2">
                {images.length > 0 &&
                  images.map((image, index) => {
                    return (
                      <div
                        key={`${index}-${id}`}
                        className={classNames(
                          "w-2 h-2 rounded-full cursor-pointer",
                          {
                            "bg-gray-300": index !== currImage,
                            "bg-gray-700": index === currIndex,
                          }
                        )}
                        onClick={(e) => {
                          setCurrentImage(images[index]);
                          setCurrentIndex(index);
                          e.stopPropagation();
                        }}
                      >
                        {/* {console.log(image)} */}
                        <LazyLoadImage
                          alt={title}
                          height={100}
                          src={image} // use normal <img> attributes as props
                          width={100}
                          className="hidden"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="xl:p-6 p-3 flex flex-col grow w-[70%]">
            <h5 className="text-gray-700 xl:text-xl text-base font-bold tracking-tight xl:mb-11 mb-3 truncate text-ellipsis w-11/12">
              {title}
            </h5>

            <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 lg:gap-x-4 xl:gap-16 gap-y-2 pb-2 mb-2  xl:pb-5 xl:mb-5 border-b border-gray-300">
              <div className="flex flex-row lg:flex-col items-center lg:items-start xl:space-y-5 lg:space-x-0 space-x-1 text-sm xl:text-base/4">
                <span className="font-bold lg:font-normal">Category</span>
                <span className="truncate text-ellipsis max-w-full">
                  {category.name}
                </span>
              </div>

              <div className="flex flex-row lg:flex-col items-center lg:items-start xl:space-y-5 lg:space-x-0 space-x-1 text-sm xl:text-base/4">
                <span className="font-bold lg:font-normal">Description</span>
                <span className="truncate text-ellipsis max-w-full">
                  {description}
                </span>
              </div>

              <div className="flex flex-row lg:flex-col items-center lg:items-start xl:space-y-5 lg:space-x-0 space-x-1 text-sm xl:text-base/4">
                <span className="font-bold lg:font-normal">Price</span>
                <span className="truncate text-ellipsis max-w-full">
                  ${price.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center justify-end space-x-2">
              <div className="flex flex-row items-center">
                Quantity:
                <input
                  className="ml-2 w-16 border border-gray-300 rounded-lg p-1"
                  type="number"
                  min="1"
                  value={qty}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    e.stopPropagation();
                    setQty(parseInt(e.target.value, 10));
                  }}
                />
              </div>
              <button
                className="btn-primary text-base/4 z-1"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
