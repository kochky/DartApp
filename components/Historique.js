import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import React,{ useEffect, useState } from 'react'
import { UserContext } from '../Context'


function Historique({navigation}){
    const data = React.useContext(UserContext); 

    function deleteGame(gameName){
        data.setChampionship(prevState=>{
            const state={...prevState}; 
            delete state[gameName]
            return state
        })
    }

    const finishedGame=[]
    Object.values(data.championship).map(cup=>cup.gameOver && finishedGame.push(cup))
 
    return(
        <View>
            {finishedGame.length>0 ? Object.values(data.championship).map((gameName,i)=>
                gameName.gameOver===true&& (
                    <View key={i}>
                        <Text>{gameName.name} </Text>
                        <Text>{gameName.winner} </Text>
                        <View><Text>Joueurs: </Text>{gameName.player.map((joueur,i)=><Text key={i}>{joueur.name}</Text>)}</View>
                        <Button  title="Effacer" onPress={()=>deleteGame(gameName.name)}></Button>

                    </View>)
                ):
                <Text>Aucun Historique</Text>}
        </View>
    )
}
export default Historique