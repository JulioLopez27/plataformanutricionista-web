
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'

import { Input, CustomModal } from '~/components'

import { useState } from 'react';
import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'

const validationSchema = yup.object().shape({
  email: yup.string().required('Campo obligatorio').email('Ingrese un formato valido').trim(),
  password: yup.string().required('Campo obigatorio').trim()
})

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false) // Agrega este estado
  const [message, setMessage] = useState('') // Agrega este estado para manejar el mensaje de error  
  const [messageType, setMessageType] = useState('')
  
  const [auth, setAuth] = useLocalStorage('auth', {})

  const formik = useFormik({
    onSubmit: async (values) => {

      try {
        const res = await axios({
          method: 'get',
          baseURL:import.meta.env.VITE_API_URL,
          url: '/login',
          auth:{
            username: values.email,
            password: values.password
          }
        })
        setAuth(res.data)
        setIsModalOpen(true)
        setMessage(`Bienvenido nutricionista: ${res.data.user.nombre}  ${res.data.user.apellido}.`)
        setMessageType('approval')

      } catch (error) {
        setIsModalOpen(true);
        setMessage(error.response.data.error)
        setMessageType('error')
      }
    },
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema
  })


  const handleCloseModal = () => {
    setIsModalOpen(false); // Función para cerrar el modal
  }

  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />
}

  return (

    <div>

      <main className="container max-w-2xl p-5 bg-white rounded-2xl border-2 my-24 mx-auto space-x-4 ">

        <h1 className="text-3xl text-center font-semibold mb-3">Bienvenido nutricionista</h1>

        <p className="font-semibold">Este es un espacio dedicado a profesionales de la nutrición para gestionar y mejorar la salud de sus pacientes.</p>

        <form className="space-y-4 mt-3" onSubmit={formik.handleSubmit}>

          <Input
            autoComplete="off"
            type="text"
            name="email"
            label="Correo electrónico"
            placeholder="ingrese su correo"
            error={formik.touched.email && formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Input
            type="password"
            name="password"
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            error={formik.touched.password && formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className="flex flex-col text-center gap-4 text-white">

            <button type='submit' className=" p-2 bg-verde_oscuro rounded-xl border ">Ingresar</button>
            <a href="/signup" className=" p-2 bg-verde_oscuro rounded-xl border ">Registrar</a>
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