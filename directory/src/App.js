import React from 'react';
import Dictionary from './Dictionary'
import { Layout } from 'antd'
import './App.css';

const { Content, Header } = Layout

function App() {
  return(
    <div>
      <Layout>
        <Header style={{color: 'white'}}>
          Vetter Dictionary
        </Header>
        <Content className="content-container">
          {<Dictionary/>}
        </Content>
      </Layout>
    </div>
  )
}

export default App;
