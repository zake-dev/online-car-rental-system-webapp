import * as React from 'react';

type Props = React.HTMLProps<HTMLImageElement> & {
  productId: number;
};

export default function ProductImage({ productId, ...props }: Props) {
  const images = [`${productId}.jpg`, `${productId}.avif`, `${productId}.webp`];
  const [imageIndex, setImageIndex] = React.useState(0);

  const onError = () => setImageIndex((state) => state + 1);

  return (
    <img
      src={`/images/products/${images[imageIndex]}`}
      onError={onError}
      {...props}
    />
  );
}
