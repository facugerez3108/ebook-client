import { User } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-black text-white">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <a href='#' className='font-bold text-xl'>
                            BIBLIOTECA
                        </a>    
                    </div>
                    <div className='flex items-center'>
                        <button
                            className='p-1 rounded-full hover:bg-gray-800 focus:outline-one focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus-ring-white'
                            aria-label='Menú de Usuario'
                        >
                            <User className='h-6 w-6'/>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;