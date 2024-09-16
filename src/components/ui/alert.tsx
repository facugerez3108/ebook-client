import React, { useEffect, useRef } from 'react'
import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react"


interface AlertModalProps {
    message: string;
    type: "success" | "error" | "warning" | "info"
    description: string;
    onClose: () => void;
    isOpen: boolean;
    onConfirm?: () => void;
}

const Alert = ({message, type, description, onClose, isOpen, onConfirm}: AlertModalProps) => {
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

    const getIcon = () => {
        switch(type){
            case "success":
                return <CheckCircle className="text-green-500" />;
            case "error":
                return <XCircle className="text-red-500" />;
            case "warning":
                return <AlertCircle className="text-yellow-500" />;
            case "info":
                return <Info className="text-blue-500" />;
            default:
                return null;
        }
    }
    
    const getBackgroundColor = () => {
        switch(type){
            case "success":
                return "bg-green-100";
            case "error":
                return "bg-red-100";
            case "warning":
                return "bg-yellow-100";
            case "info":
                return "bg-blue-100";
            default:
                return "";
        }
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target === modalRef.current){
            onClose();
        }
    }

    return (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          onClick={handleOverlayClick}
        >
            <div 
                ref={modalRef}
                className={`w-full max-w-md ${getBackgroundColor()} rounded-lg shadow-lg`}
                role='dialog'
                aria-modal='true'
                aria-labelledby='modal-title'
            >
                <div className='p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 id='modal-title' className='text-lg font-semibold flex items-center gap-2'>
                            {getIcon()}
                            <span>{message}</span>
                        </h2>
                        <button
                            onClick={onClose}
                            className='text-gray-400 hover:text-gray-600 transition-colors'
                            aria-label='Cerrar'
                        >
                            <X className='w-5 h-5' />
                        </button>
                    </div>
                    <p className='text-sm gray-600 mb-4'> {description} </p>
                    <div className='flex justify-end'>
                        <button
                            onClick={onConfirm}
                            className='px-4 py-2 bg-blue-500 mr-4 text-white rounded hover:bg-blue-600 transition-colors'
                        >
                            Aceptar
                        </button>
                        <button
                            onClick={onClose}
                            className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors'
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alert