import { StyleSheet, Text, View, Switch, Button,TextInput } from 'react-native';
import React , { useState,useEffect} from 'react'
import {UserContext} from '../App'


function ScoreRow({ player, gameRemaining, setGameRemaining}){
    const data = React.useContext(UserContext); 

    const [victory,setVictory]=useState(0)
    const [star,setStar]=useState(0)

    function increment(){
        setVictory(prevState=>prevState+1)
        setGameRemaining(prevState=>prevState-1)
    }

    useEffect(() => {
        
    }, [gameRemaining])

    return(
        <View  style={styles.row}>
            <Text style={styles.text}>{player}</Text>
            {data.isEnabled && <Text style={styles.text}>{data.troiscentun===true ? '301':'501'}</Text>}
            <Text style={styles.text}>{victory}</Text>
            <Text style={styles.text}>{star}</Text>
            <Text style={styles.text}><Button onPress={increment} title="+" ></Button></Text>
        </View>
    )
}

const styles = StyleSheet.create({
      row:{
          //flex:1,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection:'row',
          width:"100%",
          textAlign:"center",
          marginBottom:20,
      },
      text:{
        textAlign:"center",
        flex:1,
    }
  
    })

export default ScoreRow