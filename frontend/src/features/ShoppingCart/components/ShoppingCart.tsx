import { useLocation } from 'react-router-dom';

import { useModal } from '@/hooks';

import ShoppingCartFloatingButton from './ShoppingCartFloatingButton';
import ShoppingCartModal from './ShoppingCartModal';

export default function ShoppingCart() {
  const location = useLocation();
  const { isOpen, openModal, closeModal } = useModal();

  if (!location.pathname.startsWith('/browse')) return <></>;

  return (
    <div className="fixed bottom-8 right-8">
      {isOpen ? (
        <ShoppingCartModal onClose={closeModal} />
      ) : (
        <ShoppingCartFloatingButton onOpen={openModal} />
      )}
    </div>
  );
}
