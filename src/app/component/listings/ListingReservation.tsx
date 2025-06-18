'use client';

import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';


interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates

}) => {
    return (
      <div
        style={{
          backgroundColor: 'white',             // bg-white
          borderRadius: '0.75rem',              // rounded-xl = 12px
          border: '1px solid #e5e7eb',          // border-[1px] border-neutral-200
          overflow: 'hidden'                    // overflow-hidden
        }}
      >
        <div
          style={{
            display: 'flex',                    // flex
            flexDirection: 'row',               // flex-row
            alignItems: 'center',               // items-center
            gap: '0.25rem',                     // gap-1 = 1 * 0.25rem
            padding: '1rem'                     // p-4 = 4 * 0.25rem
          }}
        >
          <div
            style={{
              fontSize: '1.5rem',               // text-2xl = 24px
              fontWeight: 600                   // font-semibold
            }}
          >
            ${price}
          </div>
          <div
            style={{
              fontWeight: 300,             // font-light
              color: '#525252'             // text-neutral-600
            }}
          >
            month        
          </div>


        </div>
        <hr/>
        <Calendar        
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
        />
        <hr  />

        <div style={{ padding: '1rem' }}>

            <Button
            disabled={disabled}
            label="Reserve"
            onClick={onSubmit}
            />

        </div>

        <div
          style={{
            padding: '1rem',              // p-4
            display: 'flex',              // flex
            flexDirection: 'row',         // flex-row
            alignItems: 'center',         // items-center
            justifyContent: 'space-between', // justify-between
            fontWeight: 600,              // font-semibold
            fontSize: '1.125rem'          // text-lg = 18px
           }}
             >
          <div>
            Total
          </div>

          <div>
            ${totalPrice}
          </div>
        </div>


      </div>

    );
}

export default ListingReservation;