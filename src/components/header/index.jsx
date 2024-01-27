import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import useCartStore from "../../store/cartStore";

const Header = () => {
  const { totalQuantity, totalPrice } = useCartStore();

  return (
    <>
      <nav id="header" className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-between items-center">
            <Link to="/">
              <img src={logo} alt="silkhaus" />
            </Link>

            <div className="py-4 xl:pt-[34px] xl:pb-[32px] flex flex-shrink-0 space-x-1 sm:space-x-3 ms-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-purple-950 font-bold" : ""
                }
              >
                <span className="px-1 xl:px-3 text-base/3 xl:text-xl/[20px] tracking-wide ">
                  Products
                </span>
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "text-purple-950 font-bold" : ""
                }
              >
                <span className="px-1 xl:px-3 me-1 sm:me-2 text-base/3 xl:text-xl/[20px] tracking-wide">
                  Cart
                </span>
                | <span className="ms-1 sm:ms-2">{totalQuantity}</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
