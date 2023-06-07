import React from 'react';
import './Layout.css';
import Sider from './Sider';
import Header from './Header';
import { Breadcrumb, Layout, Menu, theme } from 'antd';




export default props => 
  <Layout className="geral-layout">
    
      <Sider>

      </Sider>
      <Layout className="site-layout">
        <Header>

        </Header>


    </Layout>

  </Layout>

