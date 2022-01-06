import { StyleSheet, Text, View, Switch, Button,TextInput } from 'react-native';
import React,{ useState, useEffect } from 'react'
import ScoreRow from './ScoreRow';
import { UserContext } from '../App';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';


function Game(){
    const data = React.useContext(UserContext); 
    const [gameRemaining,setGameRemaining]=useState(10)
    const [points,setPoints]=useState()
  
                     
    useEffect(() => {
      
        if(data.troiscentun){
            setPoints(301)
        }
        else {
            setPoints(501)
        }
        const game={
            player:[],
            301:points,
            decompte:data.isEnabled
        }
        Object.values(data.names).map((name)=>game.player.push({name,victory:0,star:0,points:points}))
        data.setChampionship({...data.championship,[data.gameName]:game})
       
      }, [points])

   


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
       
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",
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
export default Game