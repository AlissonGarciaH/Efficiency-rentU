'use client';

import {
  GiHouse,
  GiCampingTent,
  GiModernCity,
  GiDogHouse,
} from 'react-icons/gi';
import { MdApartment, MdOutlineBedroomChild } from 'react-icons/md';
import { FaPersonWalking } from 'react-icons/fa6';
import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaHome } from "react-icons/fa";

export const categories = [
  {
    label: "Walking Distance from Campus",
    icon: FaPersonWalking,
    description: "Just a short walk from campus!",
  },
  {
    label: "Studio",
    icon: MdOutlineBedroomChild,
    description: "Compact, all-in-one living space.",
  },
  {
    label: "Tiny House",
    icon: GiHouse,
    description: "Efficient small home living!",
  },
  {
    label: "Shared Apartment",
    icon: MdApartment,
    description: "You’ll be sharing with other students.",
  },
  {
    label: "Shared House",  // ✅ New
    icon: FaHome,
    description: "You’ll share this house with others.",
  },
  {
    label: "Private Apartment",
    icon: GiModernCity,
    description: "A private place just for you.",
  },
  {
    label: "Private House", // ✅ New
    icon: FaHome,
    description: "An entire house just for you.",
  },

  {
    label: "Fully Furnished",
    icon: GiCampingTent,
    description: "Move-in ready with all furniture.",
  },
  {
    label: "Pet Friendly",
    icon: GiDogHouse,
    description: "Bring your furry friend!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';
  if (!isMainPage) return null;

  return (
    <div>
      <Container>
        <div
          style={{
            paddingTop: '1rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflowX: 'auto',
          }}
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
