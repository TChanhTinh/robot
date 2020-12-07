import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Layout, notification } from 'antd';
import { formOutline } from '@ant-design/icons';
import AddWord from './AddWord';
import axios from 'axios'
import WordSection from './WordSection';

const { Search } = Input;
const { Content, Header } = Layout

const wordStruct = {
  index: 0,
  mean: '',
  type: '',
  pronunce: '',
  description: '',
  timestamp: '',
  username: ''
}

function Dictionary() {
  const [word, setWord] = useState("Abattoi")
  const [relateWord, setRelateWord] = useState([])
  const [wordData, setWordData] = useState(wordStruct)
  const [stamp, setStamp] = useState({
    username: '',
    timestamp: ''
  })

  const openNotification = (message, description) => {
    notification.open({
      message: message,
      description: description,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:9000/search/dictionary/${word}`)
    .then( res => {
      const wordDa = {
        index: res.data.index,
        word: res.data.word,
        mean: res.data.mean,
        type: res.data.type,
        pronunce: res.data.pronunciation,
        description: res.data.description,
      }
      const relate = res.data.relate

      const stamp = {
        timestamp: res.data.timestamp,
        username: res.data.username
      }
      res.data.word != null ? setWordData(wordDa) : openNotification("Tu khong ton tai", "Tu khong ton tai vui long thu lai!!") 
      setRelateWord(relate)
      setStamp(stamp)
    })
    .catch( err => {
      console.log(err)
    })
  }, [word])

  return (
    <div className="dictionary-container">
          <Row className="dictionary-container-tab-menu">
            <Col span={6}/>
            <Col className="dictionary-search-bar" span={12}>
              <Search onSearch={value => setWord(value)} placeholder="Search word"></Search>
            </Col>
            <Col span={2}/>
            <Col span={1} className="dictionary-container-tab-menu-button">
              <AddWord wordData={wordStruct} relateData={[]} icon="+" color="green" type="add"/>
            </Col>
            <Col span={1} className="dictionary-container-tab-menu-button" >
              <AddWord wordData={wordData} color="blue" relateData={relateWord}
              icon="🖉" type="edit"/>
            </Col>
            <Col span={1} className="dictionary-container-tab-menu-button">
              <AddWord wordData={wordData} relateData={relateWord} color="red" icon="🗑" type="delete"/>
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
            {relateWord.length != 0 ? <div className="dictionary-content-section">
              <WordSection className="dictionary-content-section" title='RELATE WORD' data={relateWord}/>
            </div> : <div/>}
            
          </div>
    </div>
  );
}

export default Dictionary;
