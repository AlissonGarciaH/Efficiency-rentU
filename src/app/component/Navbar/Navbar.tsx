'use client';

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div style={{
      position: 'fixed',
      width: '100%',
      backgroundColor: 'white',
      zIndex: 10,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        padding: '0.5rem',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <Container>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}>
            <Logo />
            <Search />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
                <UserMenu currentUser={currentUser} />
              </div>
              {currentUser && (
                <div style={{
                  fontSize: '0.9rem',
                  color: '#374151',
                  marginTop: '0.25rem',
                  marginRight: '1rem'
                }}>
                  Hi, {currentUser.name?.split(' ')[0]}!
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;