import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Table, Menu, Layout, theme } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'



const api = axios.create();



const { Header, Content, Footer, Sider } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [data, setdata] = useState([])
  const columns = useMemo(() => [
    {
      title: "id",
      dataIndex: "id",
      key: "id",

    },
    {
      title: "nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "cpf",
      dataIndex: "cpf",
      key: "cpf",
    },
  


  ], [])
  useEffect(() => {
    get()

  }, [])
  async function get() {

    //const path = "http://192.168.1.17:8080/notificacao/"
    const path = "http://localhost:3001/notificacao"
    await api.get(path).then((value) => {
      setdata(value.data)
      console.log(value)

    }).catch((err) => {
      console.log(err)


    })

  }
  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['4']}
              items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                (icon, index) => ({
                  key: String(index + 1),
                  icon: React.createElement(icon),
                  label: `nav ${index + 1}`,
                }),
              )}
            ></Menu>
          </Sider>

          <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
         <Table
            columns={columns}
            dataSource={data}
          >

            </Table>
        
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
        </Layout>

      </header>
    </div>
  );
}

export default App;
