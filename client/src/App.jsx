import { Suspense } from "react";
import "./App.css";
import Website from "./pages/Website";
import Layout from "./Layout/Layout";
import Properties from "./pages/properties/properties";
import Property from "./pages/property/Property";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Website />} />
              <Route path="/properties">
              <Route index element = {<Properties />} />
              <Route path=":propertyId" element = {<Property />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen = {false} />
    </QueryClientProvider>
  );
}

export default App;
