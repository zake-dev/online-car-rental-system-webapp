import { ReactComponent as FuelType } from '@assets/icons/fuel-type.svg';
import { ReactComponent as Mileage } from '@assets/icons/mileage.svg';
import { ReactComponent as Seat } from '@assets/icons/seat.svg';
import classNames from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Modal, SizedBox } from '@/components';
import { useModal } from '@/hooks';
import { useShoppingCartStore } from '@/stores';

import { Car } from '../interfaces';
import CarImage from './CarImage';

type Props = {
  car: Car;
};

export default function CarListItem({ car }: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  const canRent = car.availability;

  const onNavigateToDetails = () =>
    navigate({
      pathname: `/browse/${car.id}`,
      search: `?${searchParams.toString()}`,
    });

  const addItem = useShoppingCartStore((state) => state.addItem);
  const onAddItem = () => {
    if (!canRent) return openModal();
    addItem(car);
  };

  return (
    <div className="w-[300px] p-4 rounded-[16px] flex flex-col items-start border border-black-200">
      <div className="relative w-[260px] h-[200px] flex justify-center items-center">
        <CarImage
          carId={car.id}
          className={classNames('w-100 h-100', {
            'opacity-50': !canRent,
          })}
        />
        {canRent ? (
          <span className="absolute start-0 bottom-0 chip bg-blue-light-1 text-white">
            Available Now
          </span>
        ) : (
          <span className="absolute start-0 bottom-0 chip bg-black-400 text-white">
            Unavailable
          </span>
        )}
      </div>
      <SizedBox height={16} />
      <p
        className={classNames('w-full h-[96px] flex flex-col', {
          'opacity-50': !canRent,
        })}
      >
        <span className="w-full text-subhead-2 text-black">{car.category}</span>
        <button
          className="w-full text-headline text-black line-clamp-2 text-ellipsis hover:underline text-left"
          onClick={onNavigateToDetails}
        >
          {car.brand} {car.model}
        </button>
        <span className="w-full text-subhead-2 text-black-500">
          [{car.modelYear}]
        </span>
      </p>

      <SizedBox height={12} />
      <div className="w-full py-2 flex flex-row justify-between items-center border-t border-b border-black-300">
        <div className="flex flex-row gap-1 items-center">
          <Seat />
          <span className="text-subhead-2 text-black-600">{car.seats}</span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Mileage />
          <span className="text-subhead-2 text-black-600">
            {(car.mileage / 1000).toFixed(1)}k km
          </span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <FuelType />
          <span className="text-subhead-2 text-black-600">{car.fuelType}</span>
        </div>
      </div>
      <SizedBox height={16} />

      <p
        className={classNames('flex flex-row gap-2 items-center', {
          'opacity-50': !canRent,
        })}
      >
        <span className="text-display-5 text-black">
          {car.pricePerDay.toFixed(2)} AUD
        </span>
        <span className="text-body-1 text-black">per day</span>
      </p>
      <SizedBox height={16} />
      <button
        className={classNames('btn btn-medium', {
          'btn-primary': canRent,
          'btn-secondary': !canRent,
        })}
        onClick={onAddItem}
      >
        Add to Cart
      </button>

      <Modal.Alert
        isOpen={isOpen}
        onRequestClose={closeModal}
        title="Sorry, the car is not available now."
        message="Please try other cars."
      />
    </div>
  );
}
