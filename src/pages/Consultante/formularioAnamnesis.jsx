import { Input } from '~/components'
import { useEffect, useState, useMemo } from 'react';
import { useLocalStorage } from 'react-use'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik'
import * as yup from 'yup'


const validationSchema = yup.object().shape({
    fecha: yup.date().required('Campo obligatorio'),
    edad: yup.number().required('Campo obligatorio'),
    peso: yup.number().required('Campo obligatorio'),
    altura: yup.number().required('Campo obligatorio'),
    constitucion_corporal: yup.string().required('Campo obligatorio'),
    historia_alimentaria: yup.string().required('Campo obligatorio'),
    horarios_alimenticios: yup.string().required('Campo obligatorio'),
    objetivos_clinicos: yup.string().required('Campo obligatorio'),
    deficits_nutricionales: yup.string().required('Campo obligatorio'),
});



export function FormularioAnamnesis() {
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


    const initialValues = useMemo(() => ({
        fecha: isLoaded ? data.fecha : '',
        edad: isLoaded ? data.edad : '',
        peso: isLoaded ? data.peso : '',
        altura: isLoaded ? data.altura : '',
        constitucion_corporal: isLoaded ? data.constitucion_corporal : '',
        historia_alimentaria: isLoaded ? data.historia_alimentaria : '',
        horarios_alimenticios: isLoaded ? data.horarios_alimenticios : '',
        objetivos_clinicos: isLoaded ? data.objetivos_clinicos : '',
        deficits_nutricionales: isLoaded ? data.deficits_nutricionales : '',
    }), [isLoaded, data]);


    const formik = useFormik({
        //se carga los datos al crear el formulario
        initialValues: initialValues,
        // onSubmit: async (values) => {
        //     try {
        //         const res = await axios({
        //             method: 'PUT',
        //             baseURL: import.meta.env.VITE_API_URL,
        //             url: '/TODO',
        //             data: values,
        //             headers: { Authorization: `Bearer ${auth.accesToken}` }
        //         })
        //         console.log("🚀 ~ onSubmit: ~ res:", res)
        //     } catch (error) {
        //         console.log("🚀 ~ onSubmit: ~ error:", error)
        //     }
        // }, validationSchema
    })

    const fetchData = async () => {
        try {
            const user_data = await axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/detalleConsultante/anamnesis',
                data: { id_consultante: idConsultante }, // Asegúrate de enviar los datos correctos según tu API
                headers: { Authorization: `Bearer ${auth.accesToken}` }
            })

            setData(user_data.data); // Se debe acceder a la propiedad .data para obtener los datos
            setIsLoaded(true);

            // Establecer los valores en el formulario de anamnesis
            formik.setValues({
                fecha: user_data.data.fecha,
                edad: user_data.data.edad,
                peso: user_data.data.peso,
                altura: user_data.data.altura,
                constitucion_corporal: user_data.data.constitucion_corporal,
                historia_alimenticia: user_data.data.historia_alimenticia,
                horarios_alimenticios: user_data.data.horarios_alimenticios,
                objetivos_clinicos: user_data.data.objetivos_clinicos,
                deficits_nutricionales: user_data.data.deficits_nutricionales
            });
        } catch (error) {
            setIsLoaded(false);
            console.log(error);
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

    // const retryFetchUserInfo = () => {
    //     setError(null); // Reinicia el estado de error
    //     fetchData(data, setIsLoaded).catch((error) => {
    //         console.error('Error al obtener la información del usuario:', error);
    //         setError(error);
    //     });
    // }



    return (
        <>
        <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-gray-900">Anamnesis nutricional</h1>
            </div>
        
        <form onSubmit={formik.handleSubmit} className="w-full max-w-lg space-y-4">
            <Input label="Fecha" type="date" name="fecha" value={formik.values.fecha} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Peso" type="number" step="0.01" name="peso" value={formik.values.peso} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Altura" type="number" step="0.01" name="altura" value={formik.values.altura} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Constitución Corporal" name="constitucion_corporal" value={formik.values.constitucion_corporal} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Historia Alimenticia" name="historia_alimenticia" value={formik.values.historia_alimenticia} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Horarios Alimenticios" name="horarios_alimenticios" value={formik.values.horarios_alimenticios} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Objetivos Clínicos" name="objetivos_clinicos" value={formik.values.objetivos_clinicos} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Déficits Nutricionales" name="deficits_nutricionales" value={formik.values.deficits_nutricionales} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Guardar cambios</button>
        </form>
        </>
    );
}

