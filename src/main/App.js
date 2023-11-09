import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {

  UserOutlined,

} from '@ant-design/icons';
import { Layout, Menu, theme, Divider, Radio, Table } from 'antd';
import Map from "../components/template/Map";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Button, Form, Input, InputNumber } from 'antd';
import { Select, DatePicker } from 'antd';
import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'leaflet'
import 'leaflet/dist/leaflet.css';

import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';


import locale from 'antd/es/date-picker/locale/pt_BR';
dayjs.extend(customParseFormat);
const { Header, Content, Footer, Sider } = Layout;
const baseUrl = "http://192.168.100.80:8080/notificacao/"
//const baseUrl = "http://localhost:3001/notificacao"
// rowSelection object indicates the need for row selection

const items = [
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `Notificações`,
}));


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;



const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});



const App = () => {






  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };
  const [form] = Form.useForm();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [data, setdata] = useState([])

  let dataNascimento;
  let dataInicioSintomas;
  let dataDiagnostico;
  let dataNotificacao;




  const [rowkeys, selectedRowKeys] = useState([]);
  const rowSelection = {
    rowkeys,
    onChange: selectedRowKeys,

    // (selectedRowKeys, selectedRows) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };


  const columns = useMemo(() => [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Doença",
      dataIndex: "doenca",
      key: "doenca",

    },

    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
    },
    {
      title: "Bairro",
      dataIndex: "bairro",
      key: "bairro",
    },
    {
      title: "Cidade",
      dataIndex: "cidade",
      key: "cidade",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
    },
    {
      title: "País",
      dataIndex: "pais",
      key: "pais",
    },
    {
      title: "Data de Nascimento",
      dataIndex: "dataNascimento",
      key: "dataNascimento",
    },
    {
      title: "Sexo",
      dataIndex: "sexo",
      key: "sexo",
    },
    {
      title: "Data de Inicio de Sintomas",
      dataIndex: "dataInicioSintomas",
      key: "dataInicioSintomas",
    },
    {
      title: "Data de Diagnóstico",
      dataIndex: "dataDiagnostico",
      key: "dataDiagnostico",
    },
    {
      title: "Data de Notificação",
      dataIndex: "dataNotificacao",
      key: "dataNotificacao",
    },
    {
      title: "Informações Clínicas",
      dataIndex: "informacoesClinicas",
      key: "informacoesClinicas",
    },



  ], [])



  useEffect(() => {
    getDados()
    /*
    const notificacoes = data 
    // Inicializar o mapa
    const map = L.map('map').setView([-14.235, -51.9253], 4);

    // Adicionar camada de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Adicionar marcadores das notificações
    notificacoes.forEach((notificacao) => {
      const { localidade, doenca} = notificacao;

      // Realizar a requisição para obter as coordenadas geográficas do endereço
      const geocodingUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${localidade}`;
      axios.get(geocodingUrl)
        .then((response) => {
          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];

            // Adicionar marcador com informações da notificação
            const marker = L.marker([lat, lon]).addTo(map);
            marker.bindPopup(`<b>${localidade}</b><br/>${doenca}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  
    */

  }, []);
  async function getDados() {

    //const path = baseUrl
    await api.get().then((value) => {
      setdata(value.data)
      console.log(value)


    }).catch((err) => {
      console.log(err)


    })

  }

  const post = () => {


    form
      .validateFields()
      .then(values => {
        values.dataNascimento = dayjs(values.dataNascimento).format("DD/MM/YYYY")
        values.dataDiagnostico = dayjs(values.dataDiagnostico).format("DD/MM/YYYY")
        values.dataInicioSintomas = dayjs(values.InicioSintomas).format("DD/MM/YYYY")
        values.dataNotificacao = dayjs(values.dataNotificacao).format("DD/MM/YYYY")


        api.post(baseUrl, values).then(function (response) {
          console.log(response);
          getDados();
          form.resetFields();

        })
          .catch(function (error) {
            console.error(error);
          });

      })
      .catch(info => {
        console.error(info);
      });
  };



  async function remove(id) {
    await api.delete((`${baseUrl}/${id}`))
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  }

  // const onFinish = (event) => {
  //   notificacao = {
  //     nome: form.getFieldValue("nome"),
  //     id: parseInt(form.getFieldValue("id")),
  //     cpf: form.getFieldValue("cpf")
  //   }
  //   setNotificacao(notificacao)
  //   console.log(notificacao)
  //   post()
  //   get()



  // };

  const onReset = () => {
    form.resetFields();
  };



  return (
    <div className="App">

      <header className="App-header">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin="" />
       <link rel="stylesheet" href="css/leaflet.extra-markers.min.css"></link>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossorigin=""></script>
          

        <Layout hasSider>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <div
              style={{
                height: 32,
                margin: 16,
                background: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
          </Sider>
          <Layout
            className="site-layout"
            style={{
              marginLeft: 200,
            }}
          >
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            />
            <Form
              {...layout}
              form={form}
              name="cadastro"
              //onFinish={onFinish}

              style={{
                maxWidth: 600,
              }}

            >
              <ConfigProvider locale={locale}>
                <Form.Item label="Data de Nascimento" name="dataNascimento">
                  <DatePicker
                    format="DD/MM/YYYY"
                    disabledDate={disabledDate}
                    locale={locale}
                    value={dataNascimento}
                    placeholder="Data de nascimento"
                  />
                </Form.Item>
              </ConfigProvider>

              <ConfigProvider locale={locale}>
                <Form.Item label="Data de Início dos Sintomas" name="dataInicioSintomas">
                  <DatePicker
                    format="DD/MM/YYYY"
                    disabledDate={disabledDate}
                    locale={locale}
                    value={dataInicioSintomas}
                    placeholder="Data de início dos sintomas"
                  />

                </Form.Item>
              </ConfigProvider>
              <ConfigProvider locale={locale}>
                <Form.Item label="Data de Diagnóstico" name="dataDiagnostico">
                  <DatePicker format="DD/MM/YYYY"
                    disabledDate={disabledDate}
                    locale={locale}
                    value={dataDiagnostico}
                    placeholder="Data de diagnóstico" />
                </Form.Item>
              </ConfigProvider>
              <ConfigProvider locale={locale}>
                <Form.Item label="Data de Notificação" name="dataNotificacao">
                  <DatePicker format="DD/MM/YYYY"
                    disabledDate={disabledDate}
                    locale={locale}

                    value={dayjs().format('DD/MM/YYYY')}
                    placeholder="Data de notificação" />
                </Form.Item>
              </ConfigProvider>

              <Form.Item label="Sexo" name="sexo">
                <Select>
                  <Option value="masculino">Masculino</Option>
                  <Option value="feminino">Feminino</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Endereço" name="endereco">
                <Input />
              </Form.Item>

              <Form.Item label="Bairro" name="bairro">
                <Input />
              </Form.Item>

              <Form.Item label="Cidade" name="cidade">
                <Input />
              </Form.Item>

              <Form.Item label="Estado" name="estado">
                <Input />
              </Form.Item>
              <Form.Item label="País" name="pais">
                <Input />
              </Form.Item>

              <Form.Item label="Nome da Doença Notificável" name="doenca">
                <Select
                  showSearch
                  style={{
                    width: 200,
                  }}
                  placeholder="Selecione a doença"
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={[
                    {
                      value: 'Tuberculose',
                      label: 'Tuberculose',
                    },
                    {
                      value: 'Hanseníase',
                      label: 'Hanseníase',
                    },
                    {
                      value: 'HIV',
                      label: 'HIV',
                    },
                    {
                      value: 'Hepatite A',
                      label: 'Hepatite A',
                    },
                    {
                      value: 'Hepatite B',
                      label: 'Hepatite B',
                    },
                    {
                      value: 'Hepatite C',
                      label: 'Hepatite C',
                    },
                    {
                      value: 'Hepatite D',
                      label: 'Hepatite D',
                    },
                    {
                      value: 'Doença de Chagas',
                      label: 'Doença de Chagas',
                    },
                    {
                      value: 'Meningite',
                      label: 'Meningites',
                    },
                    {
                      value: 'Sarampo',
                      label: 'Sarampo',
                    },
                    {
                      value: 'Rubéola',
                      label: 'Rubéola',
                    },
                    {
                      value: 'Coqueluche',
                      label: 'Coqueluche',
                    },
                    {
                      value: 'Difteria',
                      label: 'Difteria',
                    },
                    {
                      value: 'Tétano',
                      label: 'Tétano',
                    },
                    {
                      value: 'Poliomielite',
                      label: 'Poliomielite',
                    },
                    {
                      value: 'Febre Amarela',
                      label: 'Febre Amarela',
                    },
                    {
                      value: 'Dengue',
                      label: 'Dengue',
                    },
                    {
                      value: 'Chikungunya',
                      label: 'Chikungunya',
                    },
                    {
                      value: 'Zika vírus',
                      label: 'Zika vírus',
                    },
                    {
                      value: 'Influenza (Gripe)',
                      label: 'Influenza (Gripe)',
                    },
                    {
                      value: 'Leishmaniose',
                      label: 'Leishmaniose',
                    },
                    {
                      value: 'Raiva humana e animal',
                      label: 'Raiva humana e animal',
                    },
                    {
                      value: 'HTLV',
                      label: 'HTLV',
                    },
                    {
                      value: 'COVID19',
                      label: 'COVID19',
                    },
                    {
                      value: 'Outras',
                      label: 'Outras',
                    },

                  ]}
                  />
              </Form.Item>
              <p>Informações Clínicas ou Especificidade da Doença:</p>

              <Form.Item label="" name="informacoesClinicas">
                <Input.TextArea />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={post}>
                  Enviar
                </Button>
              </Form.Item>
            </Form>

            <div>
              <h1>Mapa de Notificações de Doenças</h1>
              <Map notificacoes={data} />
            </div>

            <Content
              style={{
                margin: '24px 16px 0',
                overflow: 'initial',
              }}
            >
              <div
                style={{
                  padding: 24,
                  textAlign: 'center',
                  background: colorBgContainer,
                }}
              >
                <p>Notificações</p>
                <Divider />
               

                <Table
                  rowSelection={
                    // type: 'ckchebox',
                    rowSelection
                  }
                  rowKey={columns.filter(el => el.key === 'id')}
                  columns={columns}
                  dataSource={data}
                />
              </div>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              TCC Caio Costa
            </Footer>
          </Layout>
        </Layout>


      </header>
    </div>
  );
}

export default App;
