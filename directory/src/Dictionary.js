import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Layout, Button } from 'antd';
import { formOutline } from '@ant-design/icons';
import AddWord from './AddWord';
import axios from 'axios'
import WordSection from './WordSection';

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
  const [stamp, setStamp] = useState({
    username: '',
    timestamp: ''
  })

  useEffect(() => {
    axios.get(`/search/dictionary/${word}`)
    .then( res => {
      const wordDa = {
        word: res.data.word,
        mean: res.data.mean,
        type: res.data.type,
        pronunce: res.data.pronunciation,
        description: res.data.description,
      }

      const stamp = {
        timestamp: res.data.timestamp,
        username: res.data.username
      }

      console.log(res.data)
      setWordData(wordDa)
      setStamp(stamp)
    })
    .catch( err => {
      console.log(err)
    })
  }, [word])

  return (
    <div className="dictionary-container">
      <a href='/dictionary/login'><Button>Login</Button></a>
          <Row className="dictionary-container-tab-menu">
            <Col span={6}/>
            <Col className="dictionary-search-bar" span={12}>
              <Search onSearch={value => setWord(value)} placeholder="Search word"></Search>
            </Col>

            <Col span={4}/>

            <Col span={1} >
              <AddWord className="dictionary-container-tab-menu-button" wordData={wordData}
              icon="🖉"/>
            </Col>
            <Col span={1}>
              <AddWord className="dictionary-container-tab-menu-button" icon="+"/>
            </Col>
          </Row>

          <div className="dictionary-content">
            {Object.entries(wordData).map(([key, value]) => {
              return (
                <div className="dictionary-content-section">
                  <WordSection className="dictionary-content-section" title={key.toUpperCase()} data={value}/>
                </div>
              )
            })}

            <Row className="dictionary-stamp">
              <Col span={12}>
                {stamp.username}
              </Col>
              <Col span={12}>
                {stamp.timestamp}
              </Col>
            </Row>
          </div>
    </div>
  );
}

export default Dictionary;
