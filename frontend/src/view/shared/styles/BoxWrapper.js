import styled from 'styled-components';

const BoxWrapper = styled.div`
  padding: 24px;
  margin-bottom: 16px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;

  .box-buttons {
    text-align: right;

    .ant-btn {
      margin-left: 8px;
      margin-bottom: 8px;
    }
  }
`;

export const itemLayout = {
  labelCol: {
    md: { span: 6 },
  },
  wrapperCol: {
    md: { span: 18 },
  },
};

export default BoxWrapper;
