import { Input, Header, NavBar } from "~/components"
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { useLocalStorage } from 'react-use'

import axios from "axios"
import { useFormik } from "formik"
import * as yup from "yup"


const validationSchema = yup.object().shape({
  tipo: yup.string().required("Campo obligatorio"),
  //cuerpo: yup.string().required("Campo obligatorio"),
})

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idConsultante = urlParams.get('id');


export function EnviarRegistro() {

  const [auth] = useLocalStorage('auth', {})



  const formik = useFormik({
    onSubmit: async (values) => {
      // alert("entre")
      //document.getElementById("idConsultante").value= idConsultante
      // formik.setFieldValue("idConsultante", idConsultante); 
      let formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      //console.log("formData -> " + formData)
      //alert("ID consultante 2 -> " + idConsultante)

      try {

        const res = await axios({
          method: "POST",
          baseURL: import.meta.env.VITE_API_URL,
          url: '/saveReport?idConsultante',
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.accesToken}`
          }
        })
        alert("Reporte enviado correctamente!")

        location.reload();

      } catch (error) {
        alert("Error guardando el informe, error: " + error)
      }


    },
    initialValues: {
      tipo: "",
      cuerpo: "",
      idConsultante: parseInt(idConsultante)
    },
    validationSchema
  })

  const handleEditorChange = (event, editor) => {
    const content = editor.getData(); // Get CKEditor content
    formik.setFieldValue("cuerpo", content); // Update Formik field value
  };

  const handleEditorBlur = () => {
    formik.setFieldTouched("cuerpo", true); // Mark the field as touched
  };



  //Esto tiene que ser dinamico., consultante sacarlo de la uRL?
  return (

    <div>
      <Header nombreDelUsuario={auth.user.nombre} />
      <NavBar />
      <main className="mt-4 h-44">
        <section id="enviarRegistro" className="container justify-center" >
          <div className="flex justify-center items-center h-44">
            <div className=" w-9/12 h-44">
              <form className="h-44" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Input type="hidden" id="idConsultante" name="idConsultante" value={formik.values.idConsultante} />
                <Input label="Titulo" name="tipo" type="text" id="tipo" placeholder="Ingrese un titulo para el informe..."
                  error={formik.touched.tipo && formik.errors.tipo}
                  value={formik.values.tipo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className=" h-44">
                  <CKEditor
                    editor={ClassicEditor}
                    id="cuerpo"
                    name="cuerpo"
                    //Pre carga de datos queda para futuro
                    // data={seteo}
                    onReady={(editor) => {
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={handleEditorChange}
                    onBlur={handleEditorBlur}

                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                    init={{
                      height: "auto",
                      placeholder: "Ingrese el informe...",

                    }}
                    error={formik.touched.cuerpo && formik.errors.cuerpo}
                    value={formik.values.cuerpo}


                  />
                  <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Guardar cambios</button>

                </div>

              </form>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
