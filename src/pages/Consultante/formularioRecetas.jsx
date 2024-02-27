import { useState } from 'react';
import axios from 'axios';
import { Input } from '~/components';

export function FormularioRecetas() {
    const [formData, setFormData] = useState({
        categories: '',
        difficulty: '',
        tiempo: '',
        ingredientes: '',
        alergias: '',
        vegano: false,
        vegetariano: '',
        celiaco: '',
        has_video: '',
        user_id: '',
        healthy: '',
        byName: '',
        status: '',
        page: 1,
        perPage: 10
    });

    const handleChangeCheckbox = (event) => {
        const { name, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked,
        }));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/getRecipes', formData);
            console.log('Recetas:', response.data);
            // Aquí puedes manejar la respuesta de la API
        } catch (error) {
            console.error('Error al obtener recetas:', error);
            // Aquí puedes manejar los errores de la solicitud
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-gray-900">Recetas sugeridas</h1>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
                {/* Campos de entrada */}
                <label className="p-1 font-semibold mb-2">Categorias</label>
                <select
                    htmlFor="categorias"
                    id="categorias"
                    name="categorias"
                    // value={formData.categorias}
                    onChange={handleChange}
                    className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="">Seleccione la categoria</option>
                    <option value="todas">Todas</option>
                    <option value="almuerzo">Almuerzo</option>
                    <option value="cena">Cena</option>
<option value="bebidas">Bebidas</option>
<option value="sopas">Sopas</option>
<option value="reposteria">Reposteria</option>
<option value="postres">Postres</option>
<option value="salsas">Salsas</option>
<option value="guarnicion">Guarnición</option>
<option value="desayuno">Desayuno</option>
<option value="comidaBebe">Comida de bebé</option>
<option value="halloween">Halloween</option>
                </select>

                <label className="p-1 font-semibold mb-2">Dificultad</label>
                <select
                    htmlFor="dificultad"
                    id="dificultad"
                    name="dificultad"
                    // value={formData.dificultad}
                    onChange={handleChange}
                    className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="">Seleccione la dificultad</option>
                    <option value="facil">Fácil</option>
                    <option value="medio">Medio</option>
                    <option value="dificil">Difícil</option>
                </select>



                <Input
                    htmlFor="tiempo"
                    id="tiempo"
                    label="Tiempo máximo (minutos)"
                    name="tiempo"
                    type="number"
                    value={formData.tiempo}
                    onChange={handleChange}
                    placeholder="30"
                />

                <Input
                    htmlFor="ingredientes"
                    id="ingredientes"
                    label="Ingredientes"
                    name="ingredientes"
                    value={formData.ingredientes}
                    onChange={handleChange}
                    placeholder="Ingrediente1,Ingrediente2"
                />

                <Input
                    htmlFor="alergias"
                    id="alergias"
                    label="Alergias"
                    name="alergias"
                    value={formData.alergias}
                    onChange={handleChange}
                    placeholder="Alergeno1,Alergeno2"
                />

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="vegano"
                        name="vegano"
                        checked={formData.vegano}
                        onChange={handleChangeCheckbox}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded" />
                    <label htmlFor="vegano" className="text-gray-700">Vegano</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="vegetariano"
                        name="vegetariano"
                        checked="false"
                        onChange={handleChangeCheckbox}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="vegetariano" className="text-gray-700">Vegetariano</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="celiaco"
                        name="celiaco"
                        checked="false"
                        onChange={handleChangeCheckbox}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="celiaco" className="text-gray-700">Celíaco</label>
                </div>

                {/* 
                <Input
                    htmlFor="user_id"
                    id="user_id"
                    label="ID de usuario"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    placeholder="ID123"
                /> */}

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="saludable"
                        name="saludable"
                        checked="false"
                        onChange={handleChangeCheckbox}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="saludable" className="text-gray-700">Saludable</label>
                </div>

                <Input
                    htmlFor="byName"
                    id="byName"
                    label="Buscar por nombre"
                    name="byName"
                    value={formData.byName}
                    onChange={handleChange}
                    placeholder="Nombre de receta"
                />

                <Input
                    htmlFor="status"
                    id="status"
                    label="Estado"
                    name="status"
                    type="number"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="1"
                />

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="tiene_video"
                        name="tiene_video"
                        checked="false"
                        onChange={handleChangeCheckbox}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="tiene_video" className="text-gray-700">Tiene video</label>
                </div>

                <Input
                    htmlFor="page"
                    id="page"
                    label="Página"
                    name="page"
                    type="number"
                    value={formData.page}
                    onChange={handleChange}
                    placeholder="1"
                />


                <Input
                    htmlFor="perPage"
                    id="perPage"
                    label="Resultados por página"
                    name="perPage"
                    type="number"
                    value={formData.perPage}
                    onChange={handleChange}
                    placeholder="10"
                />



                {/* Botón de enviar */}
                <button
                    type="submit"
                    className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2"
                >
                    Buscar Recetas
                </button>
            </form>
        </>
    );
}
