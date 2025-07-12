'use client';

import qs, { ParsedQuery, StringifiableRecord } from "query-string";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import UniversitySelect, { UniversitySelectValue } from "../inputs/UniversitySelect";
import Heading from "../Heading";
import MonthSelect from "../inputs/MonthSelelct";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<UniversitySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [startMonth, setStartMonth] = useState('');
const [endMonth, setEndMonth] = useState('');

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false,
  }), []);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery: ParsedQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: StringifiableRecord = {
      ...currentQuery,
      university: location?.id ?? '',
      guestCount: guestCount.toString(),
      roomCount: roomCount.toString(),
      bathroomCount: bathroomCount.toString(),
      startMonth,
      endMonth,
    };

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    startMonth,
    endMonth,
    onNext,
    params
  ]);

  const actionLabel = useMemo(() => {
    return step === STEPS.INFO ? 'Search' : 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.LOCATION ? undefined : 'Back';
  }, [step]);

  let bodyContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Heading
        title="Where do you want to go"
        subtitle="Find the perfect location!"
      />
      <UniversitySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Map center={location ? [location.lat, location.lng] : undefined} />
    </div>
  );

  if (step === STEPS.DATE) {
  bodyContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Heading title="When do you plan to go?" subtitle="Choose the months for your stay." />
      <MonthSelect label="From" value={startMonth} onChange={setStartMonth} />
      <MonthSelect label="To" value={endMonth} onChange={setEndMonth} />
    </div>
  );
}


  if (step === STEPS.INFO) {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Heading
          title="More information"
          subtitle="Find your perfect place!"
        />
        <Counter
          title="Students"
          subtitle="How many students will be?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
