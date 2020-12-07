import React from 'react';
import Dictionary from './Dictionary'
import { Layout, Image, Row, Col } from 'antd'
import './App.css';

const { Content, Header } = Layout

function App() {
  return (
    <div>
      <Layout>
        <Header className="header-container">
          <div style={{ display: "inline" }}>
            <Image className="app-logo" width={140} src={process.env.PUBLIC_URL + '/vete_husbandry.png'} />
          </div>
          {/*<div className="header-container-title">
            <h1 style={{ color: "white", textAlign: "center" }}>DICTIONARY</h1>
  </div>*/}
        </Header>
        <Content className="content-container">
          {<Dictionary />}
        </Content>
      </Layout>
    </div>
  )
}

export default App;
