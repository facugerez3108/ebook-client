import React, {useState, useEffect} from 'react';
import Modal from '../../../components/ui/modal';
import { getClient, updateClient } from '../../../actions/client.actions';
import toast from 'react-hot-toast';


interface EditStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: number | null;
    refreshStudents: () => void;
}

const EditStudentModal:React.FC<EditStudentModalProps> = ({
    isOpen,
    onClose,
    id,
    refreshStudents,
}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [studentData, setStudentData] = useState({
        nombre: "",
        apellido: "",
        codigo: ""
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            if(id != null){
                setIsLoading(true);
                try{
                    const data = await getClient(id);
                    setStudentData({
                        nombre: data.nombre,
                        apellido: data.apellido,
                        codigo: data.codigo
                    });
                }catch(err){
                    setError("Error al obtener al estudiante");
                }finally{
                    setIsLoading(false);
                }
            }
        };
        if(isOpen){
            fetchStudentData();
        }

    },[isOpen, id])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setStudentData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if(id === null) return;

        setIsLoading(true);

        const { nombre, apellido, codigo } = studentData;

        try {
            await updateClient(id, nombre, apellido, codigo);
            toast.success("Estudiante actualizado correctamente");
            refreshStudents();
            onClose();
        } catch (err) {
            setError("Error al obtener al estudiante");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Modal
                title="Editar Estudiante"
                description='Seleccione el dato del estudiante a editar y luego presione el botón de guardar para confirmar los cambios realizados'
                isOpen={isOpen} 
                onClose={onClose}
            >
                {error && <p className='text-red-500'>{error}</p>}
                <form onSubmit={handleSave}>
                    <div className='mb-4'>
                        <label htmlFor='nombre' className='block text-sm font-medium text-gray-700'>Nombre</label>
                        <input
                            type='text'
                            id='nombre'
                            name='nombre'
                            value={studentData.nombre}
                            onChange={handleChange}
                            className='border rounded px-3 py-2 w-full'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='apellido'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Apellido
                        </label>
                        <input
                            type='text'
                            id='apellido'
                            name='apellido'
                            value={studentData.apellido}
                            onChange={handleChange}
                            className='border rounded px-3 py-2 w-full'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='codigo'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Código
                        </label>
                        <input
                            type='text'
                            id='codigo'
                            name='codigo'
                            value={studentData.codigo}
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
                            {isLoading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default EditStudentModal;