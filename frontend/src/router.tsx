import { Navigate, Route, Routes } from 'react-router-dom';

import { BrowsePage, CarDetailsPage, CheckoutPage } from '@/page';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/browse/:carId" element={<CarDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/browse" />} />
      </Routes>
    </>
  );
}
