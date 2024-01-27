import ProductCard from "../components/product-card";
import SearchBar from "../components/search-bar";
import Pagination from "../components/pagination";
import { useState, useMemo, useEffect, useCallback } from "react";
import Loader from "../components/loader";
import { useSearchParams } from "react-router-dom";
import ErrorBoundary from "../components/error-boundary";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const Products = () => {
  const [searchParams] = useSearchParams();
  const PageSize = parseInt(searchParams.get("limit")) || 10;
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "asc");
  const [data, setData] = useState([]);
  const [sourceData, setSourceData] = useState([]); //Keep original source data
  const [filteredData, setFilteredData] = useState([]); // Keep copy of filtered data for Autocomplete
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(searchParams.get("filter") || "");
  const [otherEleHeight, setOtherEleHeight] = useState(0);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const handleSorting = useCallback((event) => {
    setSort(event.target.value);
  }, []);

  const handleProductSorting = useCallback(
    (a, b) => {
      if (sort === "asc") {
        return a.price - b.price;
      } else if (sort === "desc") {
        return b.price - a.price;
      }
      return 0;
    },
    [sort]
  );

  const handleCateogryChanged = (category) => {
    console.log('category', category)
    setCategory(category);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    setData([item])
  }

  const handleOnClear = () => {
    setData(filteredData);
  }


  const formatResult = (item) => {
    return (
      <>
        <div className="flex flex-row space-x-2 items-center cursor-pointer">
          <div className="flex-shrink-0">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-5 h-5 object-cover"
            /> 
          </div>
          <div>{item.title}</div>

        </div>
      </>
    )
  }

  useEffect(() => {
    const fetchProducts = () => {
      setIsLoading(true);
      fetch("https://api.escuelajs.co/api/v1/products")
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          }
          throw new Error("Failed to load data");
        })
        .then((resData) => {
          // Default asc
          if(category) {
            resData = resData.filter((item) => {
              return item.category.name.toLowerCase() === category.toLowerCase();
            });
          }
          resData.sort(handleProductSorting);
          setData(resData);
          setSourceData(resData);
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      let newData = [...data];
      if (category) {
        // console.log(category)
        newData = [...sourceData].filter((item) => {
          return item.category.name.toLowerCase() === category.toLowerCase();
        });
      } else if (!category) {
        newData = [...sourceData];
      }


      newData.sort(handleProductSorting);
      setData(newData);
      setFilteredData(newData);
    }
  }, [sort, currentPage, category]);

  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set("sort", sort);
    url.searchParams.set("page", currentPage);
    url.searchParams.set("limit", PageSize);
    url.searchParams.set("filter", category || "all");
    window.history.pushState({}, "", url);
  }, [sort, currentPage, category]);

  const getDimension = (elmID) => {
    var elmHeight,
      elmMargin,
      elm = document.getElementById(elmID);
    if(elm) {
      if (document.all) {
        // IE
        elmHeight = elm.currentStyle.height;
        elmMargin =
          parseInt(elm.currentStyle.marginTop, 10) +
          parseInt(elm.currentStyle.marginBottom, 10) +
          "px";
      } else {
        // Mozilla
        elmHeight = elm.clientHeight;
        elmMargin =
          parseInt(
            document.defaultView
              .getComputedStyle(elm, "")
              .getPropertyValue("margin-top")
          ) +
          parseInt(
            document.defaultView
              .getComputedStyle(elm, "")
              .getPropertyValue("margin-bottom")
          );
      }
      return elmHeight + elmMargin;
    }
    return 0; 
  };

  useEffect(() => {
    const updateParentHeight = () => {
      const totalHeight =
        getDimension("header") +
        getDimension("footer") +
        getDimension("pagination") +
        getDimension("productSearch") +
        getDimension("searchBar");

      setOtherEleHeight(totalHeight);
    };

    // Measure the height initially
    updateParentHeight();

    // Add event listener for window resize
    window.addEventListener("resize", updateParentHeight);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateParentHeight);
    };
  }, [data]); // Run this effect whenever data changes

  return (
    <div className="flex flex-col grow">
      <ErrorBoundary>
        <SearchBar categoryChanged={handleCateogryChanged} />
      </ErrorBoundary>
      {isLoading ? (
        <Loader />
      ) : data?.length > 0 ? (
        <>
          {/* Content */}
          <div className="container mx-auto px-4">
            <div className="flex flex-row justify-between items-start" id="productSearch">
              <div className="flex flex-row flex-grow lg:space-x-3 me-3 items-center">
                <h1 className="hidden lg:flex text-xl xl:text-6xl font-bold text-nowrap tracking-wide text-purple-950">
                  Product Search 
                </h1>
                <div className="w-full relative z-10">
                  <ReactSearchAutocomplete
                    items={data}
                    onSelect={handleOnSelect}
                    onClear={handleOnClear}
                    formatResult={formatResult}
                    fuseOptions={{ keys: ["title"] }}
                    maxResults={5}
                    placeholder={""}
                    // necessary, otherwise the results will be blank
                    resultStringKeyName="title"
                    styling={{
                      height: '35px',
                      borderRadius: "8px",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      boxShadow: 'none'
                    }}
                  />
                </div>
              </div>

              <div className="bg-white text-sm xl:text-base rounded-lg p-2 mb-2 xl:p-6 drop-shadow xl:mb-5">
                <label className="text-gray-300">Sort By Price:</label>
                <select
                  aria-placeholder="Sort By Price: Low to High"
                  className="border-0 outline-0 text-gray-300"
                  onChange={handleSorting}
                  value={sort}
                >
                  <option value={"asc"}>Low to High</option>
                  <option value={"desc"}>High to Low</option>
                </select>
              </div>
            </div>

            <div
              className="overflow-auto"
              style={{ height: `calc(100vh - ${otherEleHeight}px)` }}
            >
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 xl:gap-x-36 xl:gap-y-7">
                {currentTableData?.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
            </div>

            <Pagination
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
              className="xl:mb-10 mb-5 mt-5 xl:mt-16"
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Products;
