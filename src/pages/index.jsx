
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from './Home'
import { Signup } from './Signup'
import { Dashboard } from './Dashboard'
import { Profile } from "./Profile"
import { DetalleConsultante } from "./Consultante/detalleConsultante"
import { FormularioAnamnesis } from "./Consultante/formularioAnamnesis"
import { FormularioAfecciones } from "./Consultante/formularioAfecciones"
import { FormularioTipoDieta } from "./Consultante/formularioTipoDieta"

import { Receta} from './Receta'
import {ListadoConsultantes} from './Consultante/listadoConsultantes'
import {Historico} from './Receta/historico'
import {HistoricoRegistro} from './Registro/historico'
import {AgregarConsultante} from './Consultante/agregarConsultante'

import { EnviarRegistro } from "./Registro/enviarRegistro";
import { RegistroEnviado } from "./Registro/registroEnviado";
  

// eslint-disable-next-line no-sparse-arrays
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }, 
  {
    path: "/profile",
    element: <Profile />,
  }, 
  {
    path: "/recetas",
    element: <Receta />,
  }, 
  {
    path: "/agregarConsultante",
    element: <AgregarConsultante />,
  }, 
  {
    path: "/detalleConsultante/anamnesis",
    element: <FormularioAnamnesis/>,
  },
  {
    path: "/detalleConsultante/afecciones",
    element: <FormularioAfecciones/>,
  },
  {
    path: "/detalleConsultante/tippdieta",
    element: <FormularioTipoDieta/>,
  },

//--->ELIMINAR LUEGO DE IMPLEMETAR LA LISTA DE CONSULTANTES CON LOS ENALCES
  {
    path: "/consultantes",
    element: <ListadoConsultantes />,
  }, 
  {
    path: "/historico",
    element: <Historico />,
  },
  {
    path: "/historicoRegistro",
    element: <HistoricoRegistro />,
  },
  {
    path: "/detalleConsultante",
    element: <DetalleConsultante/>,
  },
  {
    path: "/enviarRegistro",
    element: <EnviarRegistro />,
  },
  ,
  {
    path: "/registroEnviado",
    element: <RegistroEnviado />,
  },

//--->ELIMINAR LUEGO DE IMPLEMETAR LA LISTA DE CONSULTANTES CON LOS ENALCES


]);

export const Router = () =>
  (<RouterProvider router={router} />)
