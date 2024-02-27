import { Input } from '~/components'
import { useEffect, useState, useMemo } from 'react';
import { useLocalStorage } from 'react-use'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik'
import * as yup from 'yup'

export function FormularioTipoDieta() {

    const navigate = useNavigate()
    const [auth] = useLocalStorage('auth', {})
    const [data, setData] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    //didMount-> se usa para el useEffect no haga solicitudes http duplicadas
    const [didMount, setDidMount] = useState(false)

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const idConsultante = urlParams.get('id')

    // const [formData, setFormData] = useState({
    //     vegetariano: false,
    //     vegano: false,
    //     pescetariano: false,
    //     crudivegano: false,
    //     sin_gluten: true,
    //     sin_lactosa: false,
    //     keto: false
    // });

    const initialValues = useMemo(() => ({
        vegetariano: isLoaded ? data.vegetariano : false,
        vegano: isLoaded ? data.vegano : false,
        pescetariano: isLoaded ? data.pescetariano : false,
        crudivegano: isLoaded ? data.crudivegano : false,
        sin_gluten: isLoaded ? data.sin_gluten : false,
        sin_lactosa: isLoaded ? data.sin_lactosa : false,
        keto: isLoaded ? data.keto : false,
        alergias: isLoaded ? data.alergias : ''
    }), [isLoaded, data]);


    const formik = useFormik({
        initialValues: initialValues,

        onSubmit: async (values) => {

            // try {
            //     const res = await axios({
            //         //   method: 'post',
            //         //   baseURL: 'http://localhost:3000',
            //         //   url: '/login',
            //         //   data: values
            //     })

            // } catch (error) {

            // }
        }

    })

    // const handleChange = (e) => {
    //     const { name, checked } = e.target;
    //     setFormData({ ...formData, [name]: checked });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit(formData);
    // };

    const fetchData = async () => {
        try {
            const user_data = await axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/detalleConsultante/tipodieta', // Cambiar la URL a la correspondiente para TipoDieta
                data: { id_consultante: idConsultante },
                headers: { Authorization: `Bearer ${auth.accesToken}` }
            });

            setData(user_data.data)
            setIsLoaded(true)

            formik.setValues({
                vegetariano: user_data.data.vegetariano,
                vegano: user_data.data.vegano,
                pescetariano: user_data.data.pescetariano,
                crudivegano: user_data.data.crudivegano,
                sin_gluten: user_data.data.sinGluten,
                sin_lactosa: user_data.data.sinLactosa,
                keto: user_data.data.keto,
                alergias: user_data.data.alergias
            });
        } catch (error) {
            setIsLoaded(false)
            console.log(error)
        }
    };


    //se ejecuta al cargar la pagina
    useEffect(() => {
        setDidMount(true)
        if (auth?.user?.id) {
            if (didMount) {
                fetchData().catch((error) => {
                    console.error('Error al obtener la información del usuario:', error)
                    setError(error)
                })
            }
        } else {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, navigate, didMount])

    return (

        <>
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-gray-900">Tipo de dieta</h1>
            </div>


            <form onSubmit={formik.handleSubmit} className="max-w-lg space-y-4">

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="vegetariano"
                        name="vegetariano"
                        checked={formik.values.vegetariano}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="vegetariano" className="text-gray-700">Vegetariano</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="vegano"
                        name="vegano"
                        checked={formik.values.vegano}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="vegano" className="text-gray-700">Vegano</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="pescetariano"
                        name="pescetariano"
                        checked={formik.values.pescetariano}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="pescetariano" className="text-gray-700">Pescetariano</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="crudivegano"
                        name="crudivegano"
                        checked={formik.values.crudivegano}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="crudivegano" className="text-gray-700">Crudivegano</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="sin_gluten"
                        name="sin_gluten"
                        checked={formik.values.sin_gluten}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="sin_gluten" className="text-gray-700">Sin gluten</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="sin_lactosa"
                        name="sin_lactosa"
                        checked={formik.values.sin_lactosa}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="sin_lactosa" className="text-gray-700">Sin lactosa</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="keto"
                        name="keto"
                        checked={formik.values.keto}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="keto" className="text-gray-700">Keto</label>
                </div>

                <button
                    type="submit"
                    className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2"
                >
                    Guardar cambios
                </button>

            </form>


        </>
    )
}
