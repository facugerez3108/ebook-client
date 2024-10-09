export interface AuthResponse {
    tokens: {
        access: {
            token: string,
            expires: string 
        },
        refresh: {
            token: string,
            expires: string 
        }
    },
    user: UserProps
}

export interface UserProps {
    id: number,
    email: string,
    role: string,
    name: string,  
    createdAt: string;
    updatedAt: string;

}

export interface Comprador {
    id: number,
    nombre: string,
    apellido: string,
    codigo: string;
}

export interface Category {
    id: number,
    title: string,
    createdAt: string;
    updatedAt: string;
}

export interface Books {
    id: number,
    title: string,
    autor: string,
    code: string,
    category: Category,
    cantidad: number,
    createdAt: string;
    updatedAt: string;
}

export interface Prestamo {
    id: number,
    fechaPrestamo: string,
    fechaDevolucion: string,
    status: string,
    comprador: Comprador
    book: Books
}