
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { Input, CustomModal, Header, NavBar } from '~/components'


//Codigo validacion de extencion de archivo
const validateFileType = (value) => {
    if (!value) return false;

    const fileName = value.name;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    return allowedExtensions.test(fileName);
}

const validationSchema = yup.object().shape({
    recipe_name: yup.string().required('Campo obligatorio'),
    description: yup.string().required('Campo obligatorio'),
    categories: yup.string()
        .oneOf(['Desayuno', 'Almuerzo', 'Merienda', 'Cena'], 'Debe ser Desayuno, Almuerzo, Merienda o Cena')
        .required('Campo obligatorio'),
    difficulty: yup.string()
        .oneOf(['Facil', 'Medio', 'Dificil'], 'Debe ser Facil, Medio o Dificil')
        .required('Campo obligatorio'),
        ingredientes: yup.string().required('Campo obligatorio'),


    tiempo: yup.number()
        .min(0, 'Solo se aceptan valores positivos')
        .max(10000, 'Maximo valor que puede ingresar')
        .required('Campo obligatorio'),

    recipeImage: yup.mixed().test(
        'fileType',
        'Solo se permiten archivos de imagen (jpg, jpeg, png, gif)',
        validateFileType
    ).required("Campo obligatorio")
})



export const Receta = () => {

    const [auth] = useLocalStorage('auth', {});
    const [isModalOpen, setIsModalOpen] = useState(false); // Agrega este estado
    const [message, setMessage] = useState(''); // Agrega este estado para manejar el mensaje de error
    const [messageType, setMessageType] = useState('');





    const formik = useFormik({
        onSubmit: async (values) => {
            // Crear un nuevo objeto FormData
            let formData = new FormData();

            // Iterar sobre las claves y valores del objeto values
            Object.entries(values).forEach(([key, value]) => {
                // Si el valor es un objeto de tipo File (archivo), agregarlo directamente al FormData
                if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    // De lo contrario, agregar el par clave-valor al FormData
                    formData.append(key, value);
                }
            })

            try {
                const res = await axios({
                    method: 'POST',
                    baseURL: import.meta.env.VITE_API_URL,
                    url: '/createRecipe',
                    data: formData,
                    headers: {
                        "Content-Type": 'multipart/form-data',
                        Authorization: `Bearer ${auth.accesToken}`
                    }
                })
                setIsModalOpen(true);
                setMessage('Su solicitud de registro se ha enviado y está pendiente de aprobación, le enviaremos un correo electrónico cuando se confirme su registro. Gracias!')
                setMessageType('approval');
            } catch (error) {
                setIsModalOpen(true);
                setMessage(error.response.data.error);
                setMessageType('error');
            }

        },
        initialValues: {
            recipe_name: '',
            description: '',
            categories: '',
            difficulty: '',
            tiempo: '',
            ingredientes: '',
            alergias: '',
            vegano: '',
            vegetariano: '',
            celiaco: '',
            has_video: false,
            recipeImage: ''
        },
        validationSchema
    })

    const handleCloseModal = () => {
        setIsModalOpen(false); // Función para cerrar el modal
    }

    return (
        <div >
            <Header nombreDelUsuario={auth.user.nombre} />
            <NavBar />
            <main className="container max-w-2xl bg-white rounded-2xl border-2 p-4 my-24 mx-auto space-x-4 " >

                <h2 className="text-3xl text-center font-semibold mb-3">A crear su nueva receta!</h2>

                <form className="space-y-4 mt-3" onSubmit={formik.handleSubmit} encType="multipart/form-data" >

                    <Input
                        htmlFor='recipe_name'
                        id='recipe_name'
                        autoComplete="off"
                        type="text"
                        name="recipe_name"
                        label="Nombre de la receta"
                        placeholder="ingrese el nombre de la receta"
                        error={formik.touched.recipe_name && formik.errors.recipe_name}
                        value={formik.values.recipe_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        htmlFor='description'
                        id='description'
                        autoComplete="off"
                        type="text"
                        name="description"
                        label="Descripcion "
                        placeholder="ingrese su description"
                        error={formik.touched.description && formik.errors.description}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        htmlFor='categories'
                        id='categories'
                        autoComplete="off"
                        type="text"
                        name="categories"
                        label="Ingrese la categoria"
                        placeholder=" Desayuno, almuerzo, merienda, cena"
                        error={formik.touched.categories && formik.errors.categories}
                        value={formik.values.categories}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        htmlFor='difficulty'
                        id='difficulty'
                        autoComplete="off"
                        type="text"
                        name="difficulty"
                        label="Dificultad "
                        placeholder="Facil,Medio,Dificil"
                        error={formik.touched.difficulty && formik.errors.difficulty}
                        value={formik.values.difficulty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        htmlFor='tiempo'
                        id='tiempo'
                        type="number"
                        name="tiempo"
                        label="Tiempo de preparacion (minutos)"
                        placeholder="Ingrese en tiempo de preparacion"
                        error={formik.touched.tiempo && formik.errors.tiempo}
                        value={formik.values.tiempo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />



                    <Input
                        htmlFor='ingredientes'
                        id='ingredientes'
                        type="text"
                        name="ingredientes"
                        label="Ingrese los ingredientes "
                        placeholder="Ingrese su tiempo de experiencia en años"
                        error={formik.touched.ingredientes && formik.errors.ingredientes}
                        value={formik.values.ingredientes}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />


                    <Input
                        htmlFor='alergias'
                        id='alergias'
                        type="text"
                        name="alergias"
                        label="Alergias"
                        placeholder="Ingrese las alergias"
                        error={formik.touched.alergias && formik.errors.alergias}
                        value={formik.values.alergias}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <div className="flex items-center">
                        <label htmlFor="vegano" className="text-gray-700">Vegano</label>
                        <input
                            type="checkbox"
                            id="vegano"
                            name="vegano"
                            checked={formik.values.vegano}
                            onChange={() => formik.setFieldValue("vegano", !formik.values.vegano)}
                            className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="vegetariano" className="text-gray-700">Vegetariano</label>
                        <input
                            type="checkbox"
                            id="vegetariano"
                            name="vegetariano"
                            checked={formik.values.vegetariano}
                            onChange={() => formik.setFieldValue("vegetariano", !formik.values.vegetariano)}
                            className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="celiaco" className="text-gray-700">Celiacio </label>
                        <input
                            type="checkbox"
                            id="celiaco"
                            name="celiaco"
                            checked={formik.values.celiaco}
                            onChange={() => formik.setFieldValue("celiaco", !formik.values.celiaco)}
                            className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                        />
                    </div>

                    <Input
                        htmlFor='recipeImage'
                        id="recipeImage"
                        type="file"
                        name="recipeImage"
                        label='Foto de la receta'
                        accept='image/*'
                        error={formik.touched.recipeImage && formik.errors.recipeImage}
                        onBlur={formik.handleBlur}
                        onChange={(event) => {
                            // Obtener el archivo seleccionado del evento
                            const file = event.target.files[0];
                            // Actualizar el valor del formulario con el archivo seleccionado
                            formik.setFieldValue("recipeImage", file);
                        }}

                    />

                    <div className="flex flex-col gap-4 text-center text-white">

                        <button type="submit" className=" p-2 bg-verde_oscuro rounded-xl border  disabled:opacity-80"
                            disabled={!formik.isValid || formik.isSubmitting}>
                            {formik.isSubmitting ? 'Creando su receta' : 'Crear mi receta'}

                        </button>
                    </div>

                </form>
                <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} message={message} messageType={messageType}>
                    <h2 className="text-2xl">{messageType === 'error' ? 'Algo salió mal' : 'Éxito'}</h2>
                    {messageType === 'error' && <p>{message}</p>}
                </CustomModal>
            </main>

        </div >
    )
}