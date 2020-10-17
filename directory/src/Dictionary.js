import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Layout } from 'antd';
import axios from 'axios'

const { Search } = Input;
const { Content, Header } = Layout

function Dictionary() {
  const [word, setWord] = useState("")
  const [wordData, setWordData] = useState({
    mean: '',
    type: '',
    pronunce: '',
    description: '',
    timestamp: '',
    username: ''
  })

  useEffect(() => {
    axios.get(`http://localhost:9000/search/dictionary/${word}`)
    .then( res => {
      const wordDa = {
        word: res.data.word,
        mean: res.data.mean,
        type: res.data.type,
        pronunce: res.data.pronunciation,
        description: res.data.description,
        timestamp: res.data.timestamp,
        username: res.data.username
      }

      console.log(res.data)
      setWordData(wordDa)
    })
    .catch( err => {
      console.log(err)
    })
  }, [word])

  return (
    <div className="Dictionary">
          <Row>
            <Col span={16}>
            </Col>
            <Col span={8}>
              <Search onSearch={value => setWord(value)} placeholder="Search word"></Search>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {`${word} / ${wordData.mean}`}
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {wordData.type}
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {wordData.pronunce}
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {wordData.description}
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              {wordData.username}
            </Col>
            <Col span={12}>
              {wordData.timestamp}
            </Col>
          </Row>
    </div>
  );
}

export default Dictionary;
