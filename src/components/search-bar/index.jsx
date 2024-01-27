import { useCallback, useEffect, useState } from "react";
import Loader from "../loader";
import { useSearchParams } from "react-router-dom";

const SearchBar = ({ categoryChanged }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("filter") || "");

  useEffect(() => {
    const fetchCategories = () => {
      setIsLoading(true);
      fetch("https://api.escuelajs.co/api/v1/categories")
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          }
          throw new Error("Failed to load data");
        })
        .then((resData) => {
          setData(resData);
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    };
    fetchCategories();
  }, []);

  const handleChange = useCallback((event) => {
    setCategory(event.target.value);
  }, []);

  const search = () => {
    categoryChanged(category);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="my-4 xl:my-12" id="searchBar">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-between items-end bg-white rounded-lg shadow-md p-4 xl:py-6 xl:px-9">
            <div className="flex flex-col space-y-1 xl:space-y-3 xl:max-w-2xl me-2 grow">
              <label
                id="category"
                className="text-gray-550 text-base xl:text-lg tracking-wide"
              >
                Product Category
              </label>
              {isLoading ? (
                <Loader />
              ) : (
                data?.length > 0 && (
                  <select
                    htmlFor="category"
                    className="border-solid border-gray-100 focus:outline-0 border rounded-lg p-2 xl:p-5"
                    value={category}
                    onChange={handleChange}
                  >
                    <option value="">All</option>
                    {data.map((category) => {
                      return (
                        <option
                          key={`category-${category.id}`}
                          value={category.name}
                        >
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                )
              )}
            </div>

            <button className="btn-primary text-lg xl:text-xl" onClick={search}>
              Search Products
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
