import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import React,{ useState, useEffect } from 'react'
import { UserContext } from '../Context'


function Continue({navigation}){
    const data = React.useContext(UserContext); 

    function handlePress(name){
        data.setGameName(name)
        data.setNewGame(false)
        navigation.navigate('Game')
    }

    function deleteGame(gameName){
        data.setChampionship(prevState=>{
            const state={...prevState}; 
            delete state[gameName]
            return state
        })
    }
    const gameInProgress=[]
    Object.values(data.championship).map(cup=>!cup.gameOver&& gameInProgress.push(cup))

    return(
        <View>
            {(gameInProgress.length>0) ? Object.values(data.championship).map((gameName,i)=>
                gameName.gameOver===false&& (
                    <View key={gameName.name}>
                        <Text>{gameName.name} </Text>
                        <View><Text>Joueurs: </Text>{gameName.player.map((joueur,i)=><Text key={i}>{joueur.name}</Text>)}</View>
                        <Button  title="Continuer" onPress={()=>handlePress(gameName.name)}></Button>
                        <Button  title="Effacer" onPress={()=>deleteGame(gameName.name)}></Button>

                    </View>)
                ):(<Text>Aucune partie en cours</Text>)}
        </View>
        
    )
}

export default Continue