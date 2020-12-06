import React from 'react';
import Dictionary from './Dictionary'
import { Layout, Image } from 'antd'
import './App.css';

const { Content, Header } = Layout

function App() {
  return(
    <div>
      <Layout>
        <Header className="header-container">
          <Image className="app-logo" width={140} src={process.env.PUBLIC_URL + '/vete_husbandry.png'} />
        </Header>
        <Content className="content-container">
          {<Dictionary/>}
        </Content>
      </Layout>
    </div>
  )
}

export default App;
