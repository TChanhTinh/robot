import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Layout } from 'antd';
import axios from 'axios'
import './App.css';

const { Search } = Input;
const { Content, Header } = Layout

function App() {
  const [word, setWord] = useState("")
  const [wordData, setWordData] = useState({
    desription: "",
    id_word: 0,
    mean: "",
    pronounce: "",
    word: ""
  })

  useEffect(() => {
    axios.get(`http://localhost:9000/directory/${word}`)
    .then( res => {
      const wordDa = {
        desription: res.data.desription,
        id_word: res.data.id_word,
        mean: res.data.mean,
        pronounce: res.data.pronounce,
        word: res.data.word
      }

      console.log(res.data)
      setWordData(wordDa)
    })
    .catch( err => {
      console.log(err)
    })
  }, [word])

  return (
    <div className="App">
      <Layout>
          <Header>
              Loren ipsum
          </Header>

          <Row>
            <Col span={16}>
            </Col>
            <Col span={8}>
              <Search onSearch={value => setWord(value)} placeholder="Search word"></Search>
            </Col>
          </Row>

        <Content style={{ padding: '0 50px' }}>
          <Row>
            <Col span={24}>
              {word}
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {wordData.pronounce}
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {wordData.desription}
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {wordData.mean}
            </Col>
          </Row>

        </Content>
      </Layout>
    </div>
  );
}

export default App;
