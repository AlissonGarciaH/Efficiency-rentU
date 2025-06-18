'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;

 }

const EmptyState: React.FC<EmptyState> = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters",
    showReset
}) => {
    const router = useRouter();

    return (
        <div
          style={{
            height: '60vh',                // h-[60vh]
            display: 'flex',               // flex
            flexDirection: 'column',       // flex-col
            gap: '0.5rem',                 // gap-2 (2 * 0.25rem)
            justifyContent: 'center',      // justify-center
            alignItems: 'center'           // items-center
          }}
        >

            <Heading
              center
              title={title}
              subtitle={subtitle}
            />
            
          <div
            style={{
              width: '12rem',     // w-48 = 48 * 0.25rem = 12rem
              marginTop: '1rem'   // mt-4 = 4 * 0.25rem = 1rem
            }}
          >

            {showReset && (
           <Button
             outline
             label="Remove all filters"
             onClick={() => router.push('/')}
           />
            )}
          </div>

        </div>
    );
}

export default EmptyState;