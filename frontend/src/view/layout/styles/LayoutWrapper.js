import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';

const LayoutWrapper = styled(AntLayout)`
  background-color: #f0f2f5;

  .ant-layout {
    min-height: 100vh;
    overflow-x: visible !important;
    overflow-y: visible;
  }

  .ant-layout-content {
    margin: 24px;
  }

  .ant-tabs {
    overflow: visible;
  }
`;

export default LayoutWrapper;
