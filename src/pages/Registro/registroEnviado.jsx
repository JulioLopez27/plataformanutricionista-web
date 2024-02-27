import axios from "axios";
import { Input, Header, NavBar } from "~/components";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export function RegistroEnviado() {
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const navigate = useNavigate();

console.log(cuerpo)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idBorrador = urlParams.get('tipo');

        if (idBorrador) {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/getReport?id=${idBorrador}`);

          if (response.data.tipo !== "") {
            setTitulo(response.data.tipo);
            setCuerpo(response.data.nota);
          } else {
            setTitulo("ID de informe incorrecto");
            setCuerpo("ID de informe incorrecto");
          }
        }
      } catch (error) {
        console.error('Error trayendo data:', error);
        setTitulo("ID de informe incorrecto");
        setCuerpo("ID de informe incorrecto");
      }
    };

    fetchData();
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Go back in the history stack
  };

  return (
    <div>
      <Header />
      <NavBar />
      <main className="mt-4">
        <section id="enviarRegistro" className="container justify-center">
          <div className="flex justify-center items-center">
            <div className="w-9/12">
              <div className="h-auto border border-black rounded-lg p-4">
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">Título:</label>
                <div className="border border-black rounded-lg p-2">
                  <div id="tipo" className="overflow-auto h-20 text-gray-800">{titulo}</div>
                </div>
                <br />
                <label htmlFor="cuerpo" className="block text-sm font-medium text-gray-700 mb-2">Cuerpo:</label>
                <div className="border border-black rounded-lg p-2">
                  <div id="cuerpo" className="overflow-auto h-20 text-gray-800">{cuerpo}</div>
                </div>
                <br />
                <button onClick={handleGoBack} className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Volver Atrás</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
