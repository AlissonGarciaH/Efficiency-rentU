'use client';

import { UNIVERSITIES } from "@/constants/universities";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

// Add the minimal prop interface
interface SearchProps {
  minimal?: boolean;
}

const Search: React.FC<SearchProps> = ({ minimal = false }) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const universityValue = params?.get("university");
  const startMonth = params?.get("startMonth");
  const endMonth = params?.get("endMonth");
  const guestCount = params?.get("guestCount");

  const universityLabel = useMemo(() => {
    if (!universityValue) return "University";
    const university = UNIVERSITIES.find((u) => u.id === universityValue);
    return university?.name ?? "University";
  }, [universityValue]);

  const durationLabel = useMemo(() => {
    if (startMonth && endMonth) {
      const start = new Date(startMonth + "-01");
      const end = new Date(endMonth + "-01");

      const formatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
      });

      return `${formatter.format(start)} – ${formatter.format(end)}`;
    }

    return "Period";
  }, [startMonth, endMonth]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Students`;
    }

    return "Add Students";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      style={{
        border: "1px solid #e5e7eb",
        padding: "0.25rem 0.5rem",
        borderRadius: "9999px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease",
        display: "flex",
        alignItems: "center",
        maxWidth: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Always show University label */}
        <div
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            paddingLeft: "1rem",
            paddingRight: "1rem",
            whiteSpace: "nowrap",
          }}
        >
          {universityLabel}
        </div>

        {/* Hide the rest if minimal */}
        {!minimal && (
          <>
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                paddingLeft: "1rem",
                paddingRight: "1rem",
                borderLeft: "1px solid #e5e7eb",
                borderRight: "1px solid #e5e7eb",
                flex: 1,
                textAlign: "center",
              }}
            >
              {durationLabel}
            </div>

            <div
              style={{
                fontSize: "0.875rem",
                paddingLeft: "1rem",
                paddingRight: "0.5rem",
                color: "#4b5563",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.75rem",
                display: "flex",
              }}
            >
              <div>{guestLabel}</div>
            </div>
          </>
        )}

        {/* Always show search icon */}
        <div
          style={{
            padding: "0.5rem",
            backgroundColor: "#00f5a3",
            borderRadius: "9999px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
