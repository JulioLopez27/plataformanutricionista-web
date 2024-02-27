import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useEffect, useState, useMemo } from 'react';
import { useLocalStorage } from 'react-use'
import { useNavigate } from 'react-router-dom'

import { Input, Custom_select, Header, NavBar, CustomModal } from '~/components'

const validationSchema = yup.object().shape({
  nombre: yup.string().required('Campo obligatorio'),
  apellido: yup.string().required('Campo obligatorio'),
  telefono: yup.string()
    .min(9, 'El número de teléfono debe tener al menos 9 dígitos')
    .max(15, 'El número de teléfono tiene un máximo de 15 dígitos')
    .matches(/^[0-9]*$/, 'El número de teléfono solo puede contener números'),
  email: yup.string().email().required('Campo obligatorio'),
  especialidad: yup.number().integer().required('Campo obligatorio'),
  anos_experiencia: yup.number()
    .min(0, 'Solo se aceptan valores positivos')
    .max(70, 'Maximo valor que puede ingresar')
    .required('Campo obligatorio'),
  pais: yup.number().integer().required('Campo obligatorio'),
  ciudad: yup.string().required('Campo obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(12, 'La contraseña no puede tener más de 12 caracteres')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(/[0-9]+/, 'La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un símbolo especial')
    .matches(/^\S*$/, 'La contraseña no puede contener espacios en blanco')

})





export function Profile() {

  const [isModalOpen, setIsModalOpen] = useState(false) // Agrega este estado
  const [message, setMessage] = useState('') // Agrega este estado para manejar el mensaje de error  
  const [messageType, setMessageType] = useState('')

  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [countries, setCountries] = useState([])
  const [specialties, setSpecialties] = useState([])

  const [auth, setAuth] = useLocalStorage('auth', {})
  //didMount-> se usa para el useEffect no haga solicitudes http duplicadas
  const [didMount, setDidMount] = useState(false)


  const initialValues = useMemo(() => ({
    nombre: isLoaded ? userInfo.nombre : '',
    apellido: isLoaded ? userInfo.apellido : '',
    email: isLoaded ? userInfo.email : '',
    telefono: isLoaded ? userInfo.telefono : '',
    anos_experiencia: isLoaded ? userInfo.anos_experiencia : '',
    especialidad: isLoaded ? userInfo.especialidad : '',
    pais: isLoaded ? userInfo.pais : '',
    ciudad: isLoaded ? userInfo.ciudad : '',
    password: ''
  }), [isLoaded, userInfo])


  // Definir la función de envío del formulario utilizando Formik
  const formik = useFormik({
    initialValues: initialValues,
    // Utilizar la información del usuario como valores iniciales del formulario,
    onSubmit: async (values) => {
      try {
        const res = await axios({
          method: 'put',
          baseURL: import.meta.env.VITE_API_URL,
          url: '/updateProfileData',
          data: values, // Enviar los datos modificados al servidor
          headers: { Authorization: `Bearer ${auth.accesToken}` }
        })
        setAuth(res.data)
        setIsModalOpen(true)
        setMessage("Sus datos se actualizaron con suceso.")
        setMessageType('approval')
      } catch (error) {

        console.error('Error al actualizar el perfil:', error);
        setIsModalOpen(true);
        setMessage("No se pudo actualizar sus datos.")
        setMessageType('error')

      }
    }, validationSchema
  })



  const fetchData = async () => {
    const [userRes, countriesRes, specialtiesRes] = await Promise.all([

      axios({
        method: 'get',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/getProfileData',
        headers: { Authorization: `Bearer ${auth.accesToken}` }
      }),

      axios({
        method: 'get',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/getCountries',
      }),

      axios({
        method: 'get',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/getSpecialty',
      }),
    ])

    setUserInfo(userRes.data)
    setCountries(countriesRes.data)
    setSpecialties(specialtiesRes.data)
    setIsLoaded(true)


    formik.setValues({
      nombre: userRes.data.nombre,
      apellido: userRes.data.apellido,
      email: userRes.data.email,
      telefono: userRes.data.telefono,
      anos_experiencia: userRes.data.anos_experiencia,
      especialidad: userRes.data.especialidad,
      pais: userRes.data.pais,
      ciudad: userRes.data.ciudad
    })
  }

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
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, navigate, didMount])

  // Función para volver a intentar obtener los datos del usuario
  const retryFetchUserInfo = () => {
    setError(null); // Reinicia el estado de error
    fetchData(setUserInfo, setCountries, setSpecialties, setIsLoaded).catch((error) => {
      console.error('Error al obtener la información del usuario:', error);
      setError(error);
    });
  }

  const handleCloseModal = () => {
    setIsModalOpen(false); // Función para cerrar el modal
  }


  return (
    <div>
      <Header nombreDelUsuario={auth.user.nombre} />
      <NavBar />
      <main className='mt-4'>
        <section id="editPerfil" className='container' >
          <div className='flex justify-center items-center'>
            {error ? (
              <div>
                <p>Error al obtener la información del usuario. Por favor, inténtalo de nuevo más tarde.</p>
                <button onClick={retryFetchUserInfo}>Reintentar</button> {/* Botón para volver a intentar */}
              </div>
            ) : isLoaded ? (

              <form onSubmit={formik.handleSubmit}>

                <Input
                  label='Nombre'
                  name='nombre'
                  placeholder="ingrese su nombre"
                  error={formik.touched.nombre && formik.errors.nombre}
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />

                <Input
                  htmlFor='apellido'
                  id='apellido'
                  autoComplete="off"
                  type="text"
                  name="apellido"
                  label="Apellido "
                  placeholder="ingrese su apellido"
                  error={formik.touched.apellido && formik.errors.apellido}
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <Input
                  htmlFor='telefono'
                  id='telefono'
                  autoComplete="off"
                  type="text"
                  name="telefono"
                  label="Telefono celular"
                  placeholder="ingrese su número telefónico con prefijo internacional + (campo no obligatorio)"
                  error={formik.touched.telefono && formik.errors.telefono}
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <Input
                  htmlFor='email'
                  id='email'
                  autoComplete="off"
                  type="text"
                  name="email"
                  label="Correo electrónico "
                  placeholder="ingrese su correo"
                  error={formik.touched.email && formik.errors.email}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  readOnly
                />

                <Input
                autoComplete= 'off'
                  htmlFor='password'
                  id='password'
                  type="password"
                  name="password"
                  label="Actualizar contraseña"
                  placeholder="Deje en blanco si no la quiere cambiar."
                  error={formik.touched.password && formik.errors.password}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <Input
                  htmlFor='anos_experiencia'
                  id='anos_experiencia'
                  type="number"
                  name='anos_experiencia'
                  label='Años de experiencia'
                  placeholder="Ingrese su tiempo de experiencia en años"
                  error={formik.touched.anos_experiencia && formik.errors.anos_experiencia}
                  value={formik.values.anos_experiencia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />

                <Custom_select
                  htmlFor='espescialidad'
                  id='especialidad'
                  type='number'
                  label='Especialidad'
                  name='especialidad'
                  placeholder="Ingrese su especialidad"
                  value={formik.values.especialidad}
                  onChange={formik.handleChange}
                  options={specialties}
                  initialValue={userInfo.especialidad}
                  error={formik.touched.especialidad && formik.errors.especialidad}
                  onBlur={formik.handleBlur} />

                <Custom_select
                  htmlFor='pais'
                  id='pais'
                  type='number'
                  label='Pais'
                  name='pais'
                  placeholder="Ingrese su pais"
                  value={formik.values.pais}
                  options={countries}
                  onChange={formik.handleChange}
                  initialValue={userInfo.pais}
                  error={formik.touched.pais && formik.errors.pais}
                  onBlur={formik.handleBlur} />

                <Input
                  htmlFor='ciudad'
                  id='ciudad'
                  type="text"
                  name='ciudad'
                  label='Ciudad'
                  placeholder="Ingrese su ciudad de residencia"
                  error={formik.touched.ciudad && formik.errors.ciudad}
                  value={formik.values.ciudad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />

                <div className="flex flex-col text-center gap-4 text-white my-4">
                  <button type="submit" className=" p-2 bg-verde_oscuro rounded-xl border  disabled:opacity-80"
                    disabled={!formik.isValid || formik.isSubmitting}>
                    {formik.isSubmitting ? 'Guardando sus modificaciones' : 'Guardar cambios'}

                  </button>
                </div>
              </form>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </section>
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} message={message} messageType={messageType}>
          <h2 className="text-2xl">{messageType === 'error' ? 'Algo salió mal' : 'Éxito'}</h2>
          {messageType === 'error' && <p>{message}</p>}
        </CustomModal>
      </main>
    </div>
  );
}
