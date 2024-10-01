import React, { useState } from 'react';
import Modal from '../../../components/ui/modal';
import { createCategory } from '../../../actions/categories.actions';
import toast from 'react-hot-toast';

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    refreshCategories: () => void;
}

const CreateCategory: React.FC<CreateUserModalProps> = ({isOpen, onClose, refreshCategories}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createCategory(title);
            toast.success("Categoria creada correctamente");
            onClose();
            refreshCategories();
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title='Nueva Categoría'
            description='Agrega los datos de la categoría'
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className='space-y-4'>
                {error && <p className='text-red-500'>{error}</p>}
                <div>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Título</label>
                    <input 
                        type='text' 
                        id='title' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className='rounded border py-2 px-3 w-full' 
                    />
                </div>
                <div className='flex justify-end'>
                    <button type='submit' className='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                        {isLoading ? 'Creando...' : 'Crear'}
                    </button>
                </div>
            </form>
        </Modal>
    )
}


export default CreateCategory;