import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Axios from 'axios';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';

import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.veterDictionary') // returns Database object

import PouchDB from 'pouchdb-react-native'
const db2 = new PouchDB('veterdb')

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

  function syncData() {  
      Axios.get(`http://localhost:9000/dictionary/sync/${lastSync.times}-0`)
      .then((res) => {
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
      tx.executeSql("SELECT * FROM veterinary_husbandry", null, 
          (txObj, resultSet) => console.log(resultSet.rows),
          (txObj, err) => console.log(err)
        )
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
      (txObj, resultSet) => resultSet.rows[0] != null ? setWordData(resultSet.rows[0]) : {},
      (txObj, err) => console.log(err))
    })
  }

  useLayoutEffect(() => {  
    /*db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS veterinary_husbandry (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, type TEXT, pronunciation TEXT, description TEXT, mean TEXT, times TIMESTAMP)'
      , null, (txObj, resultsSet) => console.log(resultsSet),
        (txObj, err) => console.log(err)
      )
    })
    /*initDb()*/
    db2.get('4711')
      .then(doc => console.log(doc))
  }, [])
  useEffect(() => {
    //deteleAllTableData()
    /*db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM sync WHERE id=(SELECT max(id) FROM sync)"
      , null, 
      (txObj, resultSet) => {syncData(setLastSync(resultSet.rows[0]))},
      (txObj, err) => console.log(err))
    })
    queryData()*/
  }, [])

  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={e => updateSearch(e)}
        onSubmitEditing={() => submitSearch(word)}
        defaultValue={word}
      />
      <Text>{wordData.word} {wordData.type} {wordData.mean}</Text>
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
