'use client';

import AddressAutocomplete from '../inputs/AddressAutocomplete';
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
import { CountrySelectValue } from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import MultiImageUpload from '../inputs/MultiImageUpload';
import Input from '../inputs/Input';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  GALLERY = 4,
  DESCRIPTION = 5,
  PRICE = 6,
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
      category: [],
      location: {
        address: '',
        latlng: [0, 0],
      },
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      imageGallery: [],
      price: 1,
      title: '',
      description: '',
    },
  });

  const selectedCategories = watch('category') as string[];
  const location = watch('location') as CountrySelectValue | null;
  const guestCount = watch('guestCount') as number;
  const roomCount = watch('roomCount') as number;
  const bathroomCount = watch('bathroomCount') as number;
  const imageSrc = watch('imageSrc') as string;
  const imageGallery = watch('imageGallery') as string[];

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    []
  );

  const setCustomValue = (id: string, value: unknown) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const toggleCategory = (cat: string) => {
    const updated = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    setCustomValue('category', updated);
  };

  const onBack = () => setStep((v) => v - 1);
  const onNext = () => setStep((v) => v + 1);

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

  const actionLabel = step === STEPS.PRICE ? 'Create' : 'Next';
  const secondaryActionLabel = step === STEPS.CATEGORY ? undefined : 'Back';

  let bodyContent: React.ReactNode = (
    <div className="modal-content">
      <Heading
        title="Which of these best describe your place?"
        subtitle="Pick one or more categories"
      />
      <div className="grid-wrapper">
        {categories.map((item) => (
          <div key={item.label} style={{ gridColumn: 'span 1' }}>
            <CategoryInput
              onClick={toggleCategory}
              selected={selectedCategories.includes(item.label)}
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
        <Heading title="Where is your place located?" subtitle="Help students find you!" />
        <AddressAutocomplete
          onSelect={({ address, lat, lng }) => {
            setCustomValue('location', { address, latlng: [lat, lng] });
          }}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Heading title="Share some basics about your place" subtitle="What amenities do you have?" />
        <Counter
          title="Students"
          subtitle="How many students do you allow?"
          value={guestCount}
          onChange={(val) => setCustomValue('guestCount', val)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(val) => setCustomValue('roomCount', val)}
        />
        <hr />
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
        <Heading title="Add a main photo of your place" subtitle="This will be the thumbnail students see first." />
        <ImageUpload value={imageSrc} onChange={(val) => setCustomValue('imageSrc', val)} />
      </div>
    );
  }

  if (step === STEPS.GALLERY) {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Heading title="Add more photos" subtitle="Give students a better view of your place." />
        <MultiImageUpload
          value={imageGallery}
          onChange={(val) => setCustomValue('imageGallery', val)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Heading title="Describe your place" subtitle="Short and sweet works best!" />
        <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
        <hr />
        <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Heading title="Set your price" subtitle="How much do you charge per month?" />
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

