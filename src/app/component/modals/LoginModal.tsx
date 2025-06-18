'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
}  from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from "react-hot-toast";
import Button from '../Button';
import { useRouter } from 'next/navigation';




const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

   const {
   register,
   handleSubmit,
   formState: {
     errors,
     isSubmitted,
   }

   } = useForm<FieldValues>({
     defaultValues: {
        email: '',
        password: ''
     },
      
     mode: 'onSubmit'
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
     setIsLoading(true);
      
     signIn('credentials',{
      ...data,
      redirect: false,
     })
     .then((callback) =>{
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error){
        toast.error(callback.error);
      }

     })
    }

   const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
   }, [loginModal, registerModal]);

   const bodyContent = (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}
  >
    <Heading 
     title='Welcome back'
     subtitle='Login to your account!'
    />
    
    

    <Input
    id="email"
    label="Email"
    disabled={isLoading}
    register={register}
    errors={errors}
    isSubmitted={isSubmitted}
    required
    />

    <Input
    id="password"
    type="password"
    label="Password"
    disabled={isLoading}
    register={register}
    errors={errors}
    isSubmitted={isSubmitted}
    required
    />

  </div>
);

const footerContent = (
  <div className="
    flex 
    flex-col 
    gap-4 
    mt-3 
    w-full
  ">
    <hr style={{ borderColor: '#e5e7eb', borderTopWidth: '1px' }} />
    <Button
    outline
    label="Continue with Google"
    icon={FcGoogle}
    onClick={() => signIn('google')}
    />

    <div
     style={{
      color: '#737373',      // text-neutral-500
      textAlign: 'center',   // text-center
      marginTop: '0.5rem',     // mt-4
      fontWeight: 300        // font-light
     }}
>
     <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '0.5rem',  // gap-2
          marginTop: '1rem',
          justifyContent: 'center',
          fontWeight: 300,
          color: '#6b7280',  // neutral-500
          fontSize: '1rem',
        }}
      >
        First time using Efficiency?
        
        <div
        onClick={toggle}
          style={{
            color: '#1f2937', // neutral-800
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          Create an account
        </div>
      </div>

     </div>
    </div>
  </div>

)

  return (
    <Modal

    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title="Login"
    actionLabel="Continue"
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit, () => {
      toast.error("Please fill all required fields");
    })}

    body={bodyContent}
    footer={footerContent}
    />

  );

}

export default LoginModal;