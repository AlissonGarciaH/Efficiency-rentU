'use client';
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps{
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;

}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,

}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
     setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
      if (disabled) {
        return;
      }
     
      setShowModal(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(()  => {
       if (disabled) {
     return;
       }


       onSubmit();
    }, [disabled, onSubmit]);

    const handleSecndaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
      secondaryAction();
    }, [disabled, secondaryAction]);

     if (!isOpen) {
        return null;
     }

return (
<>
<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
    outline: 'none',
    height: '100vh',
    backgroundColor: 'rgba(38, 38, 38, 0.7)', // neutral-800 with 70% opacity
  }}
         >
           <div
          style={{
          position: 'relative',
          width: '100%',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: 'auto',
         }}
          className="modal-container"
          >
       {/* CONTENT */}
               <div 
                 style={{
                 height: '100%',
                 maxHeight: '90vh',
                 overflowY: 'auto',
                 transform: showModal ? 'translateY(0)' : 'translateY(100%)',
                 opacity: showModal ? 1 : 0,
                 transition: 'all 300ms ease',
                 }}
                 >
                    <div
                      style={{
                      height: 'auto',
                      border: 'none',
                      borderRadius: '0.5rem',
                      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      maxWidth: '650px',
                      paddingLeft: '1rem',
                      paddingRight: '1rem',
                      margin: 'auto',                  
                      backgroundColor: 'white',
                      outline: 'none',
                       }}
                       className="modal-content"
                      >

                        {/* HEADER */}

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
                            paddingLeft: '1.5rem',
                            paddingRight: '1.5rem',
                            borderTopLeftRadius: '0.5rem',
                            borderTopRightRadius: '0.5rem',
                            justifyContent: 'center',
                            position: 'relative',
                            borderBottom: '1px solid #e5e7eb',
                          }}
                        >

                           <button
                           onClick={handleClose}
                             style={{
                               padding: '0.25rem',
                               border: 'none',
                               background: 'transparent',
                               position: 'absolute',
                               left: '2.25rem',
                               transition: 'opacity 0.3s ease',
                             }}
                             onMouseEnter={(e) => {
                               e.currentTarget.style.opacity = '0.7';
                             }}
                             onMouseLeave={(e) => {
                               e.currentTarget.style.opacity = '1';
                             }}
                           >
                             <IoMdClose size={18} />
                           </button>
                           <div
                             style={{
                               fontSize: '1.125rem',
                               fontWeight: 600,
                             }}
                           >
                             {title}
                           </div>



                        </div>

                        {/* BODY*/}
                        <div
                          style={{
                            position: 'relative',
                            padding: '1.5rem',
                            flex: '1 1 auto',
                          }}
                        >
                            {body}
                        </div>
                        {/*FOOTER*/}

                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            padding: '1.5rem',
                          }}
                        >

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '1rem',
                                width: '100%',
                              }}
                            >
                             {secondaryAction && secondaryActionLabel && (
                             <Button
                             outline
                             disabled={disabled}
                             label={secondaryActionLabel}
                             onClick={handleSecndaryAction}
                             />
                             )}
                             <Button
                             disabled={disabled}
                             label={actionLabel}
                             onClick={handleSubmit}
                             />

                            </div>
                            {footer}
                        </div>

                  </div>

           </div>

         </div>

       </div>

    </>

);

}

export default Modal;