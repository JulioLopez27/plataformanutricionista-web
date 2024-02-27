import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from 'react-use'


export function HistoricoRegistro() {
  const [historyData, setHistoryData] = useState([]);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idConsultante = urlParams.get('id');

  const [auth] = useLocalStorage('auth', {})


  let navigate = useNavigate();
  const routeChange = () => {


    navigate('/enviarRegistro?id=' + parseInt(idConsultante));
  }


  const fetchHistory = async () => {

    try {

      const res = await axios({
        method: "post",
        baseURL: import.meta.env.VITE_API_URL,
        url: "/getHistoryInformes",
        data: { id: idConsultante },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accesToken}`
        }
      })


      return res.data;
    } catch (error) {
      alert('Error fetching history:' + error);
      return [];
    }
  };

  useEffect(() => {
    fetchHistory().then((data) => {
      setHistoryData(data);
    });
  }, []);

  console.log(historyData)
  if (historyData.length === 0) {
    return (
      <div className="h-full w-full overflow-scroll">
        <button className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2" onClick={routeChange}>
          Nuevo Informe
        </button>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-center flex-grow">Histórico</h3>

        </div>
        <table className="w-full min-w-max table-auto text-left">
          <tr>
            <td className="p-4">Aun no le ha enviado informes a este consultante..</td>
          </tr>
        </table>
      </div>
    );
  } else {
    return (
      <>
        <button className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2" onClick={routeChange}>
          Nuevo Informe
        </button>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-center flex-grow">Histórico</h3>
        </div>
        <div className="h-full w-full overflow-scroll">


          <table className="w-full min-w-max table-auto text-left border border-black">
            <thead>
              <tr>
                <th className="border-b border-green-100 bg-green-50 p-4">Informe</th>
                <th className="border-b border-green-100 bg-green-50 p-4">Fecha Generado</th>
                <th className="border-b border-green-100 bg-green-50 p-4">Enviado</th>

              </tr>
            </thead>
            <tbody>
              {historyData.map((historico) => (
                <tr key={historico.id} className="bg-white border border-black" onClick={() => navigate('/registroEnviado?tipo=' + historico.id)}>
                  <td className="p-4">{historico.nombre}</td>
                  <td className="p-4">{new Date(historico.fechaEnvio).toLocaleDateString()}</td>
                  <td className="p-4">  {historico.enviado === 1 ? 'Enviado' : 'Sin Enviar'}</td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </>
    );
  }
}
