'use client';


import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";


interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  
  return (
    <div style={{
  position: 'fixed',
  width: '100%',
  backgroundColor: 'white',
  zIndex: 10,
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
}}>
  <div
  style={{
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  borderBottom: '1px solid #e5e7eb' // light gray similar to Tailwind default
}}>
    <Container>
        <div
           style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
           }}
          >
           <Logo />
           <Search />
           <UserMenu currentUser={currentUser}/>
         </div>
    </Container>

  </div>
  <Categories />
</div>

  );
};

export default Navbar;
