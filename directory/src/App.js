import React from 'react';
import Dictionary from './Dictionary'
import { Layout } from 'antd'
import './App.css';
import AddWord from './AddWord';

const { Content, Header } = Layout

function App() {
  return(
    <div>
      <Layout>
        <Header style={{color: 'white'}}>
          Vetter Dictionary
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <AddWord/>
          {<Dictionary/>}
        </Content>
      </Layout>
    </div>
  )
}

export default App;
