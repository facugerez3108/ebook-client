import React, {useState, useEffect} from 'react';
import Modal from '../../../components/ui/modal';
import {getCategory, editCategories } from '../../../actions/categories.actions';
import toast from 'react-hot-toast';

interface EditUserProps {
    isOpen: boolean;
    onClose: () => void;
    id: number | null;
    refreshCategories: () => void;
}

const EditCategory: React.FC<EditUserProps> = ({
    isOpen,
    onClose,
    id,
    refreshCategories
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [categoriesData, setCategoriesData] = useState({
        title: ""
    });
    
    useEffect(() => {
        const fetchCategoriesData = async () => {
            if (id != null){
                setIsLoading(true);
                try{
                    const data = await getCategory(id);
                    setCategoriesData({
                        title: data.title,
                    });
                }catch(err){
                    setError("Error al obtener la categoria");
                }finally{
                    setIsLoading(false);
                }
            };
        }

        if(isOpen){
            fetchCategoriesData();
        }
    },[isOpen, id])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategoriesData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if(id === null) return;

        setIsLoading(true);

        const { title } = categoriesData;
        try{
            await editCategories(id, title);
            toast.success("Categoria actualizada correctamente");
            refreshCategories();
            onClose();
        }catch(err){
            setError("Error al actualizar la categoria");
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <>
            <Modal
                title='Editar Categoria'
                description='Seleccione el dato de la categoria a editar y luego presione el boton de guardar para confirmar los cambios.'
                isOpen={isOpen}
                onClose={onClose}
            >
                {error && <p className='text-red-500'>{error}</p>}
                <form onSubmit={handleSave}>
                    <div className='mb-4'>
                        <label
                            htmlFor='title'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Título
                        </label>
                        <input 
                            type='text'
                            id='title'
                            name='title'
                            value={categoriesData.title}
                            onChange={handleChange}
                            className='border rounded px-3 py-2 w-full'
                            required
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                        >
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default EditCategory;