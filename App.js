import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Axios from 'axios';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';

import * as SQLite from 'expo-sqlite'
import settings from './config/appSetting';
const db = SQLite.openDatabase('db.veterinar', "v1", "App",  5 * 1024 * 1024) // returns Database object

export default function App() {
  const [lastSync, setLastSync] = useState({id: 0, times: "1999-1-1"})
  const [word, setWord] = useState('')
  const [wordData, setWordData] = useState({word: "", type: "", mean: "", pronunciation: "", description: ""})

  function deteleAllTableData() {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM veterinary_husbandry'
      )
      tx.executeSql(
        'DELETE FROM sync'
      )
    })
  }

  function initDb() {
    console.log("called")
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS veterinary_husbandry (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, type TEXT, pronunciation TEXT, description TEXT, mean TEXT, times TIMESTAMP)'
      , null, (txObj) => console.log(),
        (txObj, err) => console.log(err)
      )
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sync (id INTEGER PRIMARY KEY AUTOINCREMENT, times TIMESTAMP)"
        , null, (txObj) => console.log(),
        (txObj, err) => console.log(err))
    })
  }

  function stampTime() {
    db.transaction(tx => {
      tx.executeSql("INSERT INTO sync(times) VALUES(date('now'))", null, (txObj) => {}, (txObj, err) => console.log(err))
    })
  }

  function syncData(value) {
      Axios.get(`${settings.serverUrl}/dictionary/sync/${value.times}-0`)
      .then((res) => {
        console.log(`${settings.serverUrl}/dictionary/sync/${value.times}-0`)
        let query = "INSERT INTO veterinary_husbandry(word, type, pronunciation, description, mean, times) VALUES"
        res.data.map((mapData) => {
          query+=`('${mapData.word}', '${mapData.type}', '${mapData.pronunciation}', '${mapData.description}', '${mapData.mean}', date('now')), `
        })
        query = query.substring(0, query.length-2)
        db.transaction(tx => {
          tx.executeSql(query, null, 
            (txObj, resultSet) => {stampTime()}, 
            (txObj, err) => console.log(err))
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function queryData() {
    db.transaction(tx => {
      /*tx.executeSql("SELECT * FROM veterinary_husbandry", null, 
          (txObj, resultSet) => console.log(resultSet.rows),
          (txObj, err) => console.log(err)
        )*/
      tx.executeSql("SELECT times FROM sync", null, 
          (txObj, resultSet) => console.log(resultSet.rows),
          (txObj, err) => console.log(err)
        )
    })
  }

  function updateSearch(e) {
    setWord(e);
  };

  function submitSearch(input) {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM veterinary_husbandry WHERE lower(word)=lower('${input}')`, null,
      (txObj, resultSet) => {console.log(resultSet.rows._array[0]); resultSet.rows._array[0] != null ? setWordData(resultSet.rows._array[0]) : {} },
      (txObj, err) => console.log(err))
    })
  }

  useLayoutEffect(() => {  
    initDb()
  }, [])
  useEffect(() => {
    //deteleAllTableData()
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM sync WHERE id=(SELECT max(id) FROM sync)"
      , null, 
      (txObj, resultSet) => { resultSet.rows._array[0] != undefined ? syncData(resultSet.rows._array[0]) : syncData({times: '1999-1-1'})},
      (txObj, err) => console.log(err))
    })
    queryData()
  }, [])

  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={e => updateSearch(e)}
        onSubmitEditing={() => {console.log(word) ;submitSearch(word)}}
        defaultValue={word}
      />
      {Object.values(wordData).map((mapData) => (
        <Text>{mapData}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
