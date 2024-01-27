import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import Cart from "./pages/cart";
import NotFound from "./pages/not-found";
import Layout from "./layout";
import Tnc from "./pages/tnc";
import Privacy from "./pages/privacy";
import ErrorBoundary from "./components/error-boundary";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="*"
              element={
                <ErrorBoundary>
                  <NotFound />
                </ErrorBoundary>
              }
            />
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <Products />
                </ErrorBoundary>
              }
            />
            <Route
              path="/cart"
              element={
                <ErrorBoundary>
                  <Cart />
                </ErrorBoundary>
              }
            />
            <Route
              path="/tnc"
              element={
                <ErrorBoundary>
                  <Tnc />
                </ErrorBoundary>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <ErrorBoundary>
                  <Privacy />
                </ErrorBoundary>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
