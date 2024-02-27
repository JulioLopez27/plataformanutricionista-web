import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Historico({}) {
  const [historyData, setHistoryData] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getHistory');
//      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching history:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchHistory().then((data) => {
      setHistoryData(data);
    });
  }, []);

  //console.log(historyData)
  if (historyData.length === 0) {
    return (
      <div className="h-full w-full overflow-scroll">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-center flex-grow">Historico</h3>
          <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded">
            Enviar Receta
          </button>
        </div>
        <table className="w-full min-w-max table-auto text-left">
          <tr>
            <td className="p-4">Aun no le ha enviado recetas a este consultante..</td>
          </tr>
        </table>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full overflow-scroll">
        <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-center flex-grow">Historico</h3>
          <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded">
            Sugerir Receta
          </button>
        </div>
        <table className="w-full min-w-max table-auto text-left border border-black">
  <thead>
    <tr>
      <th className="border-b border-green-100 bg-green-50 p-4">Receta</th>
      <th className="border-b border-green-100 bg-green-50 p-4">Fecha de Envio</th>
    </tr>
  </thead>
  <tbody>
    {historyData.map((historico) => (
      <tr key={historico.id} className="bg-white border border-black">
        <td className="p-4">{historico.nombre}</td>
        <td className="p-4">{new Date(historico.fechaEnvio).toLocaleDateString()}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    );
            }}
  