'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from 'react';
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "../../types";
import useRentModal from "@/app/hooks/UseRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal])

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div
          onClick={onRent}
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Enlist your Efficiency
        </div>

        <div
          onClick={toggleOpen}
          style={{
            paddingTop: '0.25rem',
            paddingBottom: '0.25rem',
            paddingLeft: '0.75rem',
            paddingRight: '0.5rem',
            border: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1.5rem',
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
          className="menu-button"
        >
          <AiOutlineMenu size={18} />
          <div>
            {currentUser ? (
              <Avatar src={currentUser.image} name={currentUser.name} />
            ) : (
              <Avatar loggedOut />
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '20vw',
            backgroundColor: 'white',
            overflow: 'hidden',
            right: 0,
            top: '3rem',
            fontSize: '0.875rem',
          }}
          className="menu-dropdown"
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
          }}>
            {currentUser ? (
              <>
                <MenuItem 
                  onClick={() => router.push("/trips")} 
                  label="My trips" 
                />

                <MenuItem 
                  onClick={() => router.push("/favorites")} 
                  label="My favorites" 
                />

                <MenuItem 
                  onClick={() => router.push("/reservations")} 
                  label="My reservations" 
                />

                <MenuItem 
                  onClick={() => router.push("/properties")} 
                  label="My properties" 
                />

                <MenuItem 
                  onClick={() => router.push("/messages")} 
                  label="Messages" 
                />

                <MenuItem 
                  onClick={rentModal.onOpen} 
                  label="Enlist your Efficiency" 
                />

                <hr />

                <MenuItem 
                  onClick={() => signOut()} 
                  label="Logout" 
                />
              </>
            ) : (
              <>
                <MenuItem 
                  onClick={loginModal.onOpen} 
                  label="Login" 
                />

                <MenuItem 
                  onClick={registerModal.onOpen} 
                  label="Sign up" 
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
