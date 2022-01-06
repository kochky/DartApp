import { StyleSheet, Text, View, Switch, Button,TextInput } from 'react-native';
import React, { useState} from 'react'
import ScoreRow from './ScoreRow';
import {UserContext} from '../App'

function Score(){
    const [gameRemaining,setGameRemaining]=useState(10)
    const data = React.useContext(UserContext); 

    return( 
        <View style={styles.nameContainer}>
                <View style={styles.row}>
                    <Text style={styles.text}>Joueur</Text>
                    {data.isEnabled && <Text style={styles.text}>Points restant</Text>}
                    <Text style={styles.text}>Victoires</Text>
                    <Text style={styles.text}>Etoiles</Text>
                    <Text style={styles.text}>Ajout Victoire</Text>

                </View>
                {Object.values(data.names).map((player,index)=>
                   <ScoreRow gameRemaining={gameRemaining} setGameRemaining={setGameRemaining} player={player} key={index}/>
                    )}
         </View>
    )
}

const styles = StyleSheet.create({
    nameContainer:{
        flex:9,
        alignItems: 'center',
        justifyContent: 'center',
        width:"80%",
    },
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
export default Score