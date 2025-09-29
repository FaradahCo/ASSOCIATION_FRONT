import { Layout, Menu, Button, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router";

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Menu items with navigation
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Dashboard",
      path: "/",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Reports",
      path: "/reports",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "Find Requests",
      path: "/find-requests",
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "Supports",
      path: "/supports",
    },
  ];

  // Handle menu item click
  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  // Get current selected key based on location
  const getSelectedKey = () => {
    const currentPath = location.pathname;
    const selectedItem = menuItems.find((item) => item.path === currentPath);
    return selectedItem ? [selectedItem.key] : ["1"];
  };

  return (
    <Layout className="h-screen main-layout">
      <Sider
        className="bg-white!"
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={280}
        collapsedWidth={80}
      >
        <img
          src="/images/logo.svg"
          alt="logo"
          className="p-5 border border-gray-200 w-full"
        />
        <Menu
          className="py-5!"
          theme="light"
          mode="inline"
          selectedKeys={getSelectedKey()}
          onClick={handleMenuClick}
          style={{
            backgroundColor: "transparent",
          }}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className="bg-white! p-0!">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="h-screen!"
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
