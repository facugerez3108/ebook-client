import React, { useEffect, useRef } from 'react';

interface ModalProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
}

const Modal = ({title, description, children, isOpen, onClose, onConfirm}: ModalProps) => {
    
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if(event.key === "Escape") {
                onClose();
            }
        }
        
        if(isOpen){
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        }
    },[isOpen, onClose])
    
    if(!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target === modalRef.current){
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {description && <p className="text-gray-600 mb-4">{description}</p>}
                {children}
                <div className="flex justify-end mt-4">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded" onClick={onClose}>Cancelar</button>
                    {onConfirm && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onConfirm}>Confirmar</button>}
                </div>
            </div>
        </div>
    );
}

export default Modal;