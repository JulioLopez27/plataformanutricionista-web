import { useState } from 'react';
import {  Header, NavBar } from '~/components'
import { FormularioGeneral } from './formularioGeneral';
import { FormularioAnamnesis } from './formularioAnamnesis';
import { FormularioAfecciones } from './formularioAfecciones';
import { FormularioTipoDieta } from './formularioTipoDieta';
import { FormularioRegistros } from './formularioRegistros';
import { FormularioRecetas } from './formularioRecetas';
import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'


// Importa los demás formularios...

export function DetalleConsultante() {
    const [isBotoneraConsultanteVisible, setIsBotoneraConsultanteVisible] = useState(false);
    
    const [formularioVisible, setFormularioVisible] = useState('general');
    const [auth] = useLocalStorage('auth', {})
    if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />
    }


    const mostrarFormulario = (formulario) => {
        setFormularioVisible(formulario);
        setIsBotoneraConsultanteVisible(false); // Oculta la BotoneraConsultante en pantallas pequeñas después de seleccionar un formulario
    };

    return (
  
        <div>
            <Header nombreDelUsuario={auth.user.nombre} />
            <NavBar />

            <main className="mt-4 flex flex-wrap items-center justify-center h-full">
                <div className="flex flex-col lg:flex-row justify-center items-center h-full">
                    <section id="BotoneraConsultanteConsultante" className="w-full lg:w-1/4 px-4 ml-4 lg:flex-shrink-0">
                        <div className="sticky top-0">
                            {/* Mostrar BotoneraConsultante como desplegable en pantallas pequeñas */}
                            <div className="lg:hidden">
                                <button onClick={() => setIsBotoneraConsultanteVisible(!isBotoneraConsultanteVisible)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full">Más detalles...</button>
                                {isBotoneraConsultanteVisible && (
                                    <form onSubmit={mostrarFormulario} className="space-y-2 bg-white shadow-md rounded-md mt-4">
                                        <button onClick={() => mostrarFormulario('general')} type="button" className="block w-full text-left px-4 py-2 hover:bg-gray-200">General</button>
                                        <button onClick={() => mostrarFormulario('anamnesis')} type="button" className="block w-full text-left px-4 py-2 hover:bg-gray-200">Anamnesis</button>
                                        <button onClick={() => mostrarFormulario('afecciones')} type="button" className="block w-full text-left px-4 py-2 hover:bg-gray-200">Afecciones</button>
                                        <button onClick={() => mostrarFormulario('tipoDieta')} type="button" className="block w-full text-left px-4 py-2 hover:bg-gray-200">Tipo de dieta</button>
                                        <button onClick={() => mostrarFormulario('registros')} type="button" className="block w-full text-left px-4 py-2 hover:bg-gray-200">Registros</button>
                                        <button onClick={() => mostrarFormulario('recetas')} type="button" className="block w-full text-left px-4 py-2 hover:bg-gray-200">Recetas</button>

                                        {/* Agrega más botones para los otros formularios... */}
                                    </form>
                                )}
                            </div>
                            {/* Mostrar BotoneraConsultante fija a la izquierda en pantallas grandes */}
                            <div className="hidden lg:block">
                                <form onSubmit={mostrarFormulario} className="space-y-2">
                                    <button onClick={() => mostrarFormulario('general')} type="button" className="bg-white text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded w-full">General</button>
                                    <button onClick={() => mostrarFormulario('anamnesis')} type="button" className="bg-white text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded w-full">Anamnesis</button>
                                    <button onClick={() => mostrarFormulario('afecciones')} type="button" className="bg-white text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded w-full">Afecciones</button>
                                    <button onClick={() => mostrarFormulario('tipoDieta')} type="button" className="bg-white text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded w-full">Tipo de dieta</button>
                                    <button onClick={() => mostrarFormulario('registros')} type="button" className="bg-white text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded w-full">Registros</button>
                                    <button onClick={() => mostrarFormulario('recetas')} type="button" className="bg-white text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded w-full">Recetas</button>
                                    {/* Agrega más botones para los otros formularios... */}
                                </form>
                            </div>
                        </div>
                    </section>

                    <section id="detalleConsultante" className="w-full lg:w-3/4 px-4">
                        {formularioVisible === 'general' && <FormularioGeneral />}
                        {formularioVisible === 'anamnesis' && <FormularioAnamnesis />}
                        {formularioVisible === 'afecciones' && <FormularioAfecciones />}
                        {formularioVisible === 'tipoDieta' && <FormularioTipoDieta/>}
                        {formularioVisible === 'registros' && <FormularioRegistros/>}
                        {formularioVisible === 'recetas' && <FormularioRecetas/>}
                        {/* Agrega más condiciones para mostrar los otros formularios... */}
                    </section>
                </div>
            </main>
        </div>
    );
}

