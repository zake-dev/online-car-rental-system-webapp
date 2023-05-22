import * as React from 'react';

type Props = React.HTMLProps<HTMLImageElement> & {
  carId: number;
};

export default function CarImage({ carId, ...props }: Props) {
  return <img src={`/images/cars/${carId}.jpg`} {...props} />;
}
