import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './app/App.tsx';
import './index.css';

const theme = {
  token: {
    colorPrimary: '#AA1826', // Brand color
    borderRadius: 12, // Rounded corners for inputs/buttons
    fontSize: 14,
    colorTextLightSolid: '#ffffff', // White text for primary buttons
  },
  components: {
    Input: {
      controlHeight: 44, // Match !h-11 (44px)
      borderRadius: 12,
      paddingBlock: 10,
      paddingInline: 12,
    },
    Button: {
      controlHeight: 44,
      borderRadius: 12,
      fontWeight: 600,
      // Primary button colors
      colorPrimary: '#AA1826',
      colorPrimaryHover: '#8B1420', // Darker on hover
      colorPrimaryActive: '#6D0F19', // Even darker on click
      // Force white text for primary buttons
      colorPrimaryText: '#ffffff',
      colorTextLightSolid: '#ffffff',
    },
  },
};

createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={theme}>
    <App />
  </ConfigProvider>
);
