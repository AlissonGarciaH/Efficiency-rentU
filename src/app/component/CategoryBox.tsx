'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs, { ParsedQuery } from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery: ParsedQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: ParsedQuery = {
      ...currentQuery,
      category: label
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.4rem',
        borderBottom: '2px solid',
        borderBottomColor: selected ? '#262626' : 'transparent', // neutral-800
        color: selected ? '#262626' : '#737373', // text-neutral-800 / 500
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.color = '#262626';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.color = '#737373';
        }
      }}
    >
      <Icon size={26} />
      <div
        style={{
          fontWeight: 500,       // Tailwind's "font-medium"
          fontSize: '0.875rem'   // Tailwind's "text-sm" = 14px
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default CategoryBox;
