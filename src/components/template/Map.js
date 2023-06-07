import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';





const Map = ({ notificacoes }) => {
    
  

    const buscarCoordenadasNotificacoes = async (notificacoes) => {
        const coordenadasPromises = notificacoes.map(async (notificacao) => {
          try {
            const enderecoCompleto = `${notificacao.endereco}, ${notificacao.cidade}, ${notificacao.estado}, ${notificacao.pais}`;
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${enderecoCompleto}`);
            const [resultado] = response.data;
      
            if (resultado) {
              const latitude = parseFloat(resultado.lat);
              const longitude = parseFloat(resultado.lon);
              return { ...notificacao, coordenadas: [latitude, longitude] };
            }
          } catch (error) {
            console.error('Erro ao obter as coordenadas:', error);
          }
        });
      
        const coordenadas = await Promise.all(coordenadasPromises);
        return coordenadas.filter((coordenada) => coordenada !== undefined);
      };
    
  const [coordenadasNotificacoes, setCoordenadasNotificacoes] = useState([]);

  useEffect(() => {
    const buscarCoordenadas = async () => {
      const coordenadas = await buscarCoordenadasNotificacoes(notificacoes);
      setCoordenadasNotificacoes(coordenadas);
    };

    buscarCoordenadas();
  }, [notificacoes]);



  


  

  return (
    <MapContainer center={[-12, -38]} zoom={5} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
      />

      {coordenadasNotificacoes.map((notificacao, index) => (
        <Marker key={index} position={notificacao.coordenadas}>
          <Popup>
            <div>
              <h2>Notificação {index + 1 }</h2>
              <p>Doença {notificacao.doenca}</p>
              <p>Endereço {notificacao.endereco}</p>
              <p>Bairro {notificacao.bairro}</p>
              <p>Cidade {notificacao.cidade}</p>
              <p>Estado: {notificacao.estado}</p>
              <p>País {notificacao.pais}</p>
              <p>Data de Nascimento {notificacao.dataNascimento}</p>
              <p>Sexo {notificacao.sexo}</p>
              <p>Início de Sintomas {notificacao.dataInicioSintomas}</p>
              <p>Diagnóstico {notificacao.dataDiagnostico}</p>
              <p>Data notificação {notificacao.dataNotificacao}</p>
              <p>Informações Clínicas {notificacao.informacoesClinicas} </p>
              {/* Outras informações da notificação */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
