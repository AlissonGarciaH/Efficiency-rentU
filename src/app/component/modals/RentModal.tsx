'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';

import useRentModal from '@/app/hooks/UseRentModal';
import Modal from './Modal';
import Heading from '../Heading';
import { categories } from '../Navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  /* -------------------------------------------------- */
  /* watch helpers */
  /* -------------------------------------------------- */

  const category = watch('category');
  const location = watch('location') as CountrySelectValue | null;
  const guestCount = watch('guestCount') as number;
  const roomCount = watch('roomCount') as number;
  const bathroomCount = watch('bathroomCount') as number;
  const imageSrc = watch('imageSrc') as string;

  /* -------------------------------------------------- */
  /* lazy loaded map */
  /* -------------------------------------------------- */

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [], // location is already passed via props; no need in dep array
  );

  /* -------------------------------------------------- */
  /* helpers */
  /* -------------------------------------------------- */

  const setCustomValue = (id: string, value: unknown) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => setStep((v) => v - 1);
  const onNext = () => setStep((v) => v + 1);

  /* -------------------------------------------------- */
  /* submit */
  /* -------------------------------------------------- */

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      onNext();
      return;
    }

    setIsLoading(true);

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing Created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => toast.error('Something went wrong.'))
      .finally(() => setIsLoading(false));
  };

  /* -------------------------------------------------- */
  /* labels */
  /* -------------------------------------------------- */

  const actionLabel = step === STEPS.PRICE ? 'Create' : 'Next';
  const secondaryActionLabel = step === STEPS.CATEGORY ? undefined : 'Back';

  /* -------------------------------------------------- */
  /* body (per-step) */
  /* -------------------------------------------------- */

  let bodyContent: React.ReactNode = (
    /* CATEGORY */
    <div className="modal-content">
      <Heading
        title="Which of these best describe your place?"
        subtitle="Pick a category"
      />
      <div className="grid-wrapper">
        {categories.map((item) => (
          <div key={item.label} style={{ gridColumn: 'span 1' }}>
            <CategoryInput
              onClick={(cat) => setCustomValue('category', cat)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Heading
          title="Where is your place located?"
          subtitle="Help students find you!"
        />

        <CountrySelect
          value={location || undefined}
          onChange={(val) => setCustomValue('location', val)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />

        <Counter
          title="Students"
          subtitle="How many students do you allow?"
          value={guestCount}
          onChange={(val) => setCustomValue('guestCount', val)}
        />

        <hr style={{ borderColor: '#e5e7eb', borderTopWidth: '1px' }} />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(val) => setCustomValue('roomCount', val)}
        />

        <hr style={{ borderColor: '#e5e7eb', borderTopWidth: '1px' }} />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(val) => setCustomValue('bathroomCount', val)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Heading
          title="Add a photo of your place"
          subtitle="Show students what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(val) => setCustomValue('imageSrc', val)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Heading
          title="How would you like to describe your place?"
          subtitle="Short and sweet works best!"
        />

        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <hr />

        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per month?"
        />

        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Enlist your Efficiency"
      body={bodyContent}
      disabled={isLoading}
    />
  );
};

export default RentModal;
