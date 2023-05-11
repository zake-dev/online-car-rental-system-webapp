import classNames from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { SizedBox } from '@/components';
import { useShoppingCartStore } from '@/stores';

import { Product } from '../interfaces';
import ProductImage from './ProductImage';

type Props = {
  product: Product;
};

export default function ProductListItem({ product }: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const hasStock = product.inStock > 0;

  const onNavigateToDetails = () =>
    navigate({
      pathname: `/browse/${product.id}`,
      search: `?${searchParams.toString()}`,
    });

  const addItem = useShoppingCartStore((state) => state.addItem);
  const onAddItem = () => addItem(product);

  return (
    <div className="w-[220px] p-4 rounded-[16px] flex flex-col items-start border border-black-200">
      <div className="relative w-[200px] h-[200px]">
        <ProductImage
          productId={product.id}
          className={classNames('w-[188px] max-h-[188px]', {
            'opacity-50': !hasStock,
          })}
        />
        {!hasStock ? (
          <span className="absolute start-0 bottom-0 chip bg-blue-light-1 text-white">
            OUT OF STOCK
          </span>
        ) : null}
      </div>
      <SizedBox height={16} />
      <button
        className={classNames(
          'w-full text-subhead-long-1 text-black h-[56px] line-clamp-2 text-ellipsis hover:underline text-left',
          {
            'opacity-50': !hasStock,
          },
        )}
        onClick={onNavigateToDetails}
      >
        {product.name}
      </button>
      <SizedBox height={24} />
      <span
        className={classNames('text-display-5 text-black', {
          'opacity-50': !hasStock,
        })}
      >
        ${product.price.toFixed(2)}
      </span>
      <span
        className={classNames('text-body-2 text-black-500', {
          'opacity-50': !hasStock,
        })}
      >
        ${product.unitPrice.toFixed(2)} per {product.unitQuantity}
      </span>
      <SizedBox height={32} />
      <button
        className="btn btn-medium btn-primary"
        onClick={onAddItem}
        disabled={!hasStock}
      >
        Add to Cart
      </button>
    </div>
  );
}
