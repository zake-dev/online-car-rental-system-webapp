import { ReactComponent as Close } from '@assets/icons/close.svg';
import { ReactComponent as DocSuccess } from '@assets/icons/doc-success.svg';
import { ReactComponent as RightArrow } from '@assets/icons/right-arrow.svg';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { api } from '@/api';
import { Modal, SpinningLoader, TextInput } from '@/components';
import { CustomerDetails } from '@/features/RentingHistory';
import { useModal } from '@/hooks';
import { useShoppingCartStore } from '@/stores';
import { Validator } from '@/utils';

export default function CheckoutPage() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'all' });
  const userEmail = getValues('userEmail');
  const { mutate: placeBooking, isLoading } = useMutation({
    mutationFn: api.rentingHistories.placeBooking,
  });
  const { data: bondAmount } = useQuery(
    ['bondAmount', userEmail],
    () => api.rentingHistories.calculateBondAmount(userEmail),
    { enabled: !!userEmail },
  );

  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const items = useShoppingCartStore((state) => state.items);
  const totalPrice = useShoppingCartStore((state) => state.totalPrice);
  const clearItems = useShoppingCartStore((state) => state.clearItems);

  const onSubmit: SubmitHandler<FieldValues> = (data) =>
    placeBooking(
      {
        cartItems: items,
        customerDetails: data as CustomerDetails,
        bondAmount: bondAmount ?? 200,
      },
      {
        onSuccess: () => {
          openModal();
          clearItems();
        },
      },
    );

  const onNavigateToHome = () => navigate('/');

  return (
    <>
      <div className="page-container gap-4">
        <h1 className="text-display-3">Booking Details</h1>
        <span className="text-body-1 text-black-500">
          Please fill out the form below to place your booking.
        </span>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[640px] flex flex-col items-stretch gap-1 py-4">
            <h2 className="text-subhead-2">Contact Details</h2>
            <div className="flex flex-row gap-4">
              <TextInput
                label="First Name"
                placeholder="First Name"
                invalidMessage="Please enter your first name without spaces"
                required
                {...register('firstName', {
                  required: true,
                  maxLength: 20,
                  validate: Validator.isNonEmptyAlpha,
                })}
                invalid={!!errors.firstName}
                aria-invalid={errors.firstName ? 'true' : 'false'}
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                invalidMessage="Please enter your last name without spaces"
                required
                {...register('lastName', {
                  required: true,
                  maxLength: 20,
                  validate: Validator.isNonEmptyAlpha,
                })}
                invalid={!!errors.lastName}
                aria-invalid={errors.lastName ? 'true' : 'false'}
              />
            </div>
            <div className="flex flex-row gap-4">
              <TextInput
                label="Email"
                placeholder="example@moolmorths.com"
                invalidMessage="Please enter a valid email"
                required
                {...register('userEmail', {
                  required: true,
                  maxLength: 255,
                  validate: Validator.isEmail,
                })}
                invalid={!!errors.userEmail}
                aria-invalid={errors.userEmail ? 'true' : 'false'}
              />
            </div>
            <div className="flex flex-row gap-4">
              <TextInput
                label="Address Line 1"
                placeholder="Address Line 1"
                supportingMessage="Apartment, suite, unit, building, floor, etc."
                invalidMessage="Please enter your apartment, suite, unit, building, floor, etc."
                required
                {...register('addressLine1', {
                  required: true,
                  maxLength: 100,
                  validate: Validator.isFilled,
                })}
                invalid={!!errors.addressLine1}
                aria-invalid={errors.addressLine1 ? 'true' : 'false'}
              />
            </div>
            <div className="flex flex-row gap-4">
              <TextInput
                label="Address Line 2"
                placeholder="Address Line 2"
                supportingMessage="Street address, P.O. box, company name, c/o"
                invalidMessage="Please enter your street address, P.O. box, company name, or c/o"
                required
                {...register('addressLine2', {
                  required: true,
                  maxLength: 100,
                  validate: Validator.isFilled,
                })}
                invalid={!!errors.addressLine2}
                aria-invalid={errors.addressLine2 ? 'true' : 'false'}
              />
            </div>
            <div className="flex flex-row gap-4">
              <TextInput
                label="Suburb"
                placeholder="Suburb"
                invalidMessage="Please enter your suburb"
                required
                {...register('suburb', {
                  required: true,
                  maxLength: 20,
                  validate: Validator.isNonEmptyAlpha,
                })}
                invalid={!!errors.suburb}
                aria-invalid={errors.suburb ? 'true' : 'false'}
              />
              <TextInput
                label="State"
                placeholder="State"
                invalidMessage="Please enter your state"
                required
                {...register('state', {
                  required: true,
                  maxLength: 10,
                  validate: Validator.isNonEmptyAlpha,
                })}
                invalid={!!errors.state}
                aria-invalid={errors.state ? 'true' : 'false'}
              />
              <TextInput
                label="Postcode"
                placeholder="Postcode"
                invalidMessage="Postcode must be 4-digit number"
                required
                {...register('postcode', {
                  required: true,
                  maxLength: 4,
                  validate: Validator.isPostcode,
                })}
                invalid={!!errors.postcode}
                aria-invalid={errors.postcode ? 'true' : 'false'}
              />
            </div>
            <div className="flex flex-row gap-4">
              <TextInput
                label="Payment Type"
                placeholder="Visa / Master Card"
                invalidMessage="Please enter your payment type"
                required
                {...register('paymentType', {
                  required: true,
                  maxLength: 10,
                  validate: Validator.isFilled,
                })}
                invalid={!!errors.paymentType}
                aria-invalid={errors.paymentType ? 'true' : 'false'}
              />
            </div>
          </div>
        </form>

        <div className="flex flex-col items-stretch py-2 border-t-2 border-b-2 border-dashed border-black-300">
          <div className="flex flex-row justify-between items-center text-black-500">
            <span className="text-subhead-long-2">Bond Amount</span>
            <span className="text-body-long-2">
              $ {(bondAmount ?? 200).toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="text-subhead-long-1">Total Price</span>
            <span className="text-body-long-1">
              $ {(totalPrice + (bondAmount ?? 200)).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="w-[640px] flex flex-row justify-between">
          <button
            className="w-[300px] btn btn-large btn-secondary"
            onClick={() => history.back()}
          >
            <Close className="text-black" fill="currentColor" />
            <span>Continue Selection</span>
          </button>
          <button
            className="w-[300px] btn btn-large btn-primary"
            disabled={!isDirty || !isValid || isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            <span>Booking</span>
            {isLoading ? (
              <SpinningLoader size={24} color="#6B7280" />
            ) : (
              <RightArrow
                className="w-6 h-6 text-inherit"
                fill="currentColor"
              />
            )}
          </button>
        </div>
      </div>

      <Modal.Alert
        isOpen={isOpen}
        icon={DocSuccess}
        title="Your reservation has been confirmed!"
        onRequestClose={closeModal}
        onAfterClose={onNavigateToHome}
      />
    </>
  );
}
