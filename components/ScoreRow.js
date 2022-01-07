import { StyleSheet, Text, View, Switch, Button,TextInput } from 'react-native';
import React from 'react'
import {UserContext} from '../App'


function ScoreRow({ name,index,setNewVictory}){
    const data = React.useContext(UserContext); 
    const gameName=data.gameName
  

    function increment(){
        //Ajoute une victoire quand on clique sur le bouton, s'il s'agit du grand duel (plus de partie restantes ni d'étoiles), offre la victoire au champion
        if(data.championship[gameName]["victoryRemaining"]>=0 && data.championship[gameName]["starRemaining"]>0 ){
            data.setChampionship(state=> (
                 {...state,
                    [gameName]:{
                        ...state[gameName],
                        ["victoryRemaining"]:state[gameName]["victoryRemaining"]-1,
                        ['player']:state[gameName]["player"].map((players,i)=>
                            i===index ? {
                                ...players,
                                ["victory"]: players["victory"]+1                   
                            }: players
                        )
                    }   
                }         
            ))  
            setNewVictory(prevState=>prevState+1) 
        }else if (data.championship[gameName]["starRemaining"]===0){
            data.setChampionship(state=> (
               {...state,
                    [gameName]:{
                        ...state[gameName],
                        ["gameOVer"]:true,
                        ["victoryRemaining"]:state[gameName]["victoryRemaining"]-1,
                        ['player']:state[gameName]["player"].map((players,i)=>
                            i===index ? {
                                ...players,
                                ["winner"]: true               
                            }: players
                        )
                    }   
                }       
            ))  
        }
    }


    
    return (
        <View  style={styles.row}>
            <Text style={styles.text}>{name}</Text>
            {data.isEnabled && <Text style={styles.text}>{data.troiscentun===true ? '301':'501'}</Text>}
            <Text style={styles.text}>{data.championship[gameName]["player"][index]["victory"]}</Text>
            <Text style={styles.text}>{data.championship[gameName]["player"][index]["star"]}</Text>
            {data.championship[gameName]["player"][index]["inDuel"] && <Text style={styles.text}><Button onPress={increment} title="+" ></Button></Text>}
        </View>)
    
    
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