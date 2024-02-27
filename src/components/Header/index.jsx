import PropTypes from 'prop-types'
import { useLocalStorage } from 'react-use'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

export const Header = ({nombreDelUsuario}) => {
    const navigate = useNavigate()
    const [auth, setAuth] = useLocalStorage('auth', {})
    const [dropdownOpen, setDropdownOpen] = useState(false)


    const logout = () => {
        setAuth({})
        navigate('/')
    }

    const goToProfile = () => {
        navigate('/profile')
    }

    return (
        <header className="bg-verde_claro text-white fixed w-full top-0 z-10 ">
            <div className="container max-w-full p-2 flex justify-between items-center ">
                <img loading="lazy" src="/assets/logo/Logo.png" alt="logo" className="w-16 sm:w-24 md:w-28 xl:w-30 2xl:w-40  cursor-pointer" onClick={scrollToTop} />
                <div className="flex gap-2 sm:gap-3 md:gap-4  items-center ">
                    <img loading="lazy" src="/assets/notification/notification.svg" alt="notification" className="w-2 sm:3 md:w-4 2xl:w-5" />



                    <div className="relative">

                        <img loading="lazy" src="/assets/user/user.svg" alt="user" className="w-2 sm:3 md:w-4 2xl:w-5" onMouseEnter={() => setDropdownOpen(true)} />

                        {dropdownOpen && auth?.user?.id && (

                            <div className="absolute right-0 mt-2 w-48 bg-white  border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg"
                                onMouseLeave={() => setDropdownOpen(false)}>


                                <div className="px-4 py-3">
                                    <button onClick={goToProfile} className="text-sm text-gris_texto hover:text-gray-400">Mi perfil</button>
                                </div>
                                <div className="px-4 py-3 flex items-center gap-2">
                                    <img loading='lazy' src="/assets/logout/logout.svg" alt="logout" className='w-2 sm:3 md:w-4 2xl:w-5    ' />
                                    <button onClick={logout} className="text-sm text-red-500 hover:text-red-700">Cerrar sesión</button>
                                </div>
                            </div>
                        )}

                    </div>

                    <span className=" font-semibold text-gray-950 text-sm sm:text-lg md:text-xl   " >Hola, {nombreDelUsuario}</span>
                </div>
            </div>
        </header>
    );
} 


Header.propTypes = {
    nombreDelUsuario: PropTypes.string,
  }