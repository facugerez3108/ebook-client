import { useState } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  BookCopy, 
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ReceiptText
} from 'lucide-react'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Usuarios', icon: Users, href: '/usuarios'  },
    { name: 'Prestamos', icon: BookCopy, href: '/prestamos'  },
    { name: 'Libros', icon: BookOpen, href: '/libros'  },
    { name: 'Estudiantes', icon: GraduationCap, href: '/estudiantes'  },
    { name: 'Categorias', icon: ReceiptText, href: '/categories'}
  ]

  return (
    <div 
      className={`
        bg-gray-100 min-h-screen 
        ${isExpanded ? 'w-64' : 'w-20'} 
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="p-4">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-white rounded-md p-2 text-gray-800 hover:bg-gray-200 flex justify-center items-center"
        >
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.href} 
                className="
                  flex items-center p-4 text-gray-700 hover:bg-gray-200
                  transition-colors duration-200
                "
              >
                <item.icon size={24} />
                {isExpanded && (
                  <span className="ml-4">{item.name}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar;