import { ReactComponent as DocSuccess } from '@assets/icons/doc-success.svg';
import { ReactComponent as RightArrow } from '@assets/icons/right-arrow.svg';
import { useMutation } from '@tanstack/react-query';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { api } from '@/api';
import { Modal, SpinningLoader, TextInput } from '@/components';
import { DeliveryDetails } from '@/features/Order';
import { useModal } from '@/hooks';
import { useShoppingCartStore } from '@/stores';
import { Validator } from '@/utils';

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'all' });
  const { mutate: placeOrderAsync, isLoading } = useMutation({
    mutationFn: api.orders.placeOrder,
  });

  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const items = useShoppingCartStore((state) => state.items);
  const totalQuantity = useShoppingCartStore((state) => state.totalQuantity);
  const totalPrice = useShoppingCartStore((state) => state.totalPrice);

  const placeOrder = useShoppingCartStore((state) => state.placeOrder);

  const onSubmit: SubmitHandler<FieldValues> = (data) =>
    placeOrderAsync(
      {
        products: items,
        deliveryDetails: data as DeliveryDetails,
        totalQuantity,
        totalPrice,
      },
      {
        onSuccess: () => {
          openModal();
          placeOrder();
        },
      },
    );

  const onNavigateToHome = () => navigate('/');

  return (
    <>
      <div className="page-container gap-4">
        <h1 className="text-display-3">Order Details</h1>
        <span className="text-body-1 text-black-500">
          Please fill out the form below to place your order.
        </span>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[640px] flex flex-col items-stretch gap-2 py-4">
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
                {...register('email', {
                  required: true,
                  maxLength: 255,
                  validate: Validator.isEmail,
                })}
                invalid={!!errors.email}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
            </div>
            <h2 className="text-subhead-2">Delivery Details</h2>
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
          </div>

          <button
            type="submit"
            className="w-[300px] btn btn-large btn-primary"
            disabled={!isDirty || !isValid || isLoading}
          >
            <span>Place Order</span>
            {isLoading ? (
              <SpinningLoader size={24} color="#6B7280" />
            ) : (
              <RightArrow
                className="w-6 h-6 text-inherit"
                fill="currentColor"
              />
            )}
          </button>
        </form>
      </div>

      <Modal.Alert
        isOpen={isOpen}
        icon={DocSuccess}
        title="Your order has been placed!"
        message="Check your email for details."
        onRequestClose={closeModal}
        onAfterClose={onNavigateToHome}
      />
    </>
  );
}
