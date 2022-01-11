import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React,{ useState, useEffect } from 'react'
import { UserContext } from '../Context'


function Historique({navigation}){
    const data = React.useContext(UserContext); 

    return(
        <View>
            {data.championship ? Object.values(data.championship).map((gameName,i)=>
                gameName.gameOver===true&& (
                    <View key={i}>
                        <Text>{gameName.name} </Text>
                        <Text>{gameName.winner} </Text>
                        <View><Text>Joueurs: </Text>{gameName.player.map((joueur,i)=><Text key={i}>{joueur.name}</Text>)}</View>

                    </View>)
                ):
                <Text>Aucun Historique</Text>}
        </View>
    )
}
export default Historique