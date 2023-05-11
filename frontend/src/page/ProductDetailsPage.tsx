import { ReactComponent as LeftArrow } from '@assets/icons/left-arrow.svg';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { api } from '@/api';
import { ProductImage } from '@/features/Product';
import { useShoppingCartStore } from '@/stores';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const id = +(productId ?? '1');
  const { data: productDetails } = useQuery({
    queryKey: ['products', id],
    queryFn: () => api.products.getProduct(id),
  });

  const items = useShoppingCartStore((state) => state.items);
  const hasStock = !!items.length;

  const addItem = useShoppingCartStore((state) => state.addItem);
  const onAddItem = () => {
    if (productDetails) addItem(productDetails);
  };

  const onHistoryBack = () => history.back();

  return (
    <div className="page-container gap-12 p-16">
      <button className="btn btn-small btn-secondary" onClick={onHistoryBack}>
        <LeftArrow className="w-3 h-3" />
        <span>Back to List</span>
      </button>

      <div className="w-[814px] gap-[64px] flex flex-row justify-between items-center">
        <ProductImage className="w-[300px] h-[300px]" productId={id} />
        <div className="w-[350px] rounded-[8px] flex flex-col gap-8 p-4 items-stretch border">
          <span className="text-headline">{productDetails?.name}</span>
          <p className="flex flex-row justify-between items-center">
            <span className="text-display-4">
              ${productDetails?.price.toFixed(2)}
            </span>
            <span className="text-body text-black-500">
              ${productDetails?.unitPrice.toFixed(2)} per{' '}
              {productDetails?.unitQuantity}
            </span>
          </p>
          {hasStock ? (
            <button className="btn btn-medium btn-primary" onClick={onAddItem}>
              Add to Cart
            </button>
          ) : (
            <button className="btn btn-medium btn-secondary" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>

      <p className="w-[814px] flex flex-col gap-2 py-8">
        <span className="text-headline">Product Details</span>
        <span className="text-body-1">
          {productDetails?.details || 'No description'}
        </span>
      </p>
    </div>
  );
}
