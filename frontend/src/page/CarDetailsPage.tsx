import { ReactComponent as FuelType } from '@assets/icons/fuel-type.svg';
import { ReactComponent as LeftArrow } from '@assets/icons/left-arrow.svg';
import { ReactComponent as Mileage } from '@assets/icons/mileage.svg';
import { ReactComponent as Seat } from '@assets/icons/seat.svg';
import { useParams } from 'react-router-dom';

import { CarImage, useCar } from '@/features/Car';
import { useShoppingCartStore } from '@/stores';

export default function CarDetailsPage() {
  const { carId } = useParams();
  const id = +(carId ?? '1');
  const { car } = useCar(id);
  const canRent = car?.availability ?? false;

  const addItem = useShoppingCartStore((state) => state.addItem);
  const onAddItem = () => {
    if (car) addItem(car);
  };

  const onHistoryBack = () => history.back();

  return (
    <div className="page-container gap-6">
      <button className="btn btn-small btn-secondary" onClick={onHistoryBack}>
        <LeftArrow className="w-3 h-3" />
        <span>Back to List</span>
      </button>

      <div className="w-[814px] gap-[64px] flex flex-row justify-between items-center">
        <div className="w-[400px] h-[400px] flex flex-row justify-center items-center">
          <CarImage className="w-full" carId={id} />
        </div>
        <div className="w-[350px] rounded-[8px] flex flex-col gap-2 p-4 items-stretch border border-black">
          <span className="text-headline text-black">
            {car?.brand} {car?.model}
          </span>
          <div className="flex flex-row gap-1">
            <span className="px-3 rounded-full text-subhead-3 text-black bg-black-300">
              {car?.category}
            </span>
            <span className="px-3 rounded-full text-subhead-3 text-black bg-blue-light-4">
              {car?.modelYear}
            </span>
          </div>
          {canRent ? (
            <span className="self-start px-3 py-1 rounded-[8px] text-subhead-3 text-white bg-blue-light-1">
              Available Now
            </span>
          ) : (
            <span className="self-start px-3 py-1 rounded-[8px] text-subhead-3 text-white bg-black-400">
              Unavailable
            </span>
          )}
          <p className="flex flex-row items-center gap-1">
            <span className="text-display-4 text-black">
              {car?.pricePerDay.toFixed(2)} AUD
            </span>
            <span className="text-body-1 text-black-500">per day</span>
          </p>
          {canRent ? (
            <button className="btn btn-medium btn-primary" onClick={onAddItem}>
              Add to Cart
            </button>
          ) : (
            <button className="btn btn-medium btn-secondary" disabled>
              Unavailable
            </button>
          )}
        </div>
      </div>

      <div className="py-2 self-start flex flex-row justify-between items-center gap-4 border-t border-b border-black-300">
        <div className="flex flex-row gap-1 items-center">
          <Seat />
          <span className="text-subhead-2 text-black-600">Seats</span>
          <span className="text-body-2 text-black-600">{car?.seats}</span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Mileage />
          <span className="text-subhead-2 text-black-600">Mileage</span>
          <span className="text-body-2 text-black-600">
            {((car?.mileage ?? 0) / 1000).toFixed(1)}k km
          </span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <FuelType />
          <span className="text-subhead-2 text-black-600">Fuel Type</span>
          <span className="text-body-2 text-black-600">{car?.fuelType}</span>
        </div>
      </div>

      <p className="w-[814px] flex flex-col gap-2 py-8">
        <span className="text-headline">Product Details</span>
        <span className="text-body-1">{car?.description}</span>
      </p>
    </div>
  );
}
