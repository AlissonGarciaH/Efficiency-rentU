'use client';

import { generateMonthOptions } from '@/constants/utils/monthOptions';
import Button from '../Button';

const monthOptions = generateMonthOptions(2024, 2030);

interface ListingReservationProps {
  price: number;
  startMonth: string;
  endMonth: string;
  setStartMonth: (value: string) => void;
  setEndMonth: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  startMonth,
  endMonth,
  setStartMonth,
  setEndMonth,
  onSubmit,
  disabled,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>${price}</div>
        <div style={{ fontWeight: 300, color: '#525252' }}>month</div>
      </div>

      <label style={{ fontWeight: 500, marginBottom: '0.25rem' }}>From</label>
      <select
        value={startMonth}
        onChange={(e) => setStartMonth(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #d1d5db',
          backgroundColor: '#f9fafb',
          color: '#111827',
          marginBottom: '1rem',
          outline: 'none',
        }}
      >
        <option value="">Select month</option>
        {monthOptions.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>

      <label style={{ fontWeight: 500, marginBottom: '0.25rem' }}>To</label>
      <select
        value={endMonth}
        onChange={(e) => setEndMonth(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #d1d5db',
          backgroundColor: '#f9fafb',
          color: '#111827',
          marginBottom: '1rem',
          outline: 'none',
        }}
      >
        <option value="">Select month</option>
        {monthOptions.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>

      <Button
        disabled={disabled || !startMonth || !endMonth}
        label="Reserve"
        onClick={onSubmit}
      />
    </div>
  );
};

export default ListingReservation;
