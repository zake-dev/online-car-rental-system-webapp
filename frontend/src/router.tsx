import { Navigate, Route, Routes } from 'react-router-dom';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/browse" element={<></> /*<BrowsePage />*/} />
        <Route
          path="/browse/:productId"
          element={<></> /*<ProductDetailsPage />*/}
        />
        <Route path="/checkout" element={<></> /*<CheckoutPage />*/} />
        <Route path="*" element={<Navigate to="/browse" />} />
      </Routes>
    </>
  );
}
