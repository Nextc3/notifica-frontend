import './Sider.css';
import React from 'react';
import { theme, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';
import OrderedListOutlined from '@ant-design/icons';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Notificações', '1', <OrderedListOutlined />),
  
];

export default props => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />

    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />

  </Sider>
}