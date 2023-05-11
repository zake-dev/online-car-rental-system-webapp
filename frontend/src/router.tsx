import * as React from 'react';

import { ReactComponent as Warning } from '@assets/icons/warning-account.svg';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { Modal } from '@/components';
import { useModal } from '@/hooks';
import { BrowsePage, CheckoutPage, ProductDetailsPage } from '@/page';
import { useShoppingCartStore } from '@/stores';

export default function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const shouldPlaceOrder = useShoppingCartStore(
    (state) => state.shouldPlaceOrder,
  );

  const onRedirect = () => navigate('/checkout');

  React.useLayoutEffect(() => {
    if (shouldPlaceOrder && location.pathname !== '/checkout') openModal();
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/browse/:productId" element={<ProductDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/browse" />} />
      </Routes>
      <Modal.Alert
        isOpen={isOpen}
        icon={Warning}
        title="You have an ongoing order!"
        message="Please complete your order first."
        onRequestClose={closeModal}
        onAfterClose={onRedirect}
      />
    </>
  );
}
