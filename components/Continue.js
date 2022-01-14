import {StyleSheet,Text, View, Button, ScrollView, ImageBackground  } from 'react-native';
import React,{  useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../Context'
import image from '../ressources/pexels-bob-clark-21300.jpg'


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

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
          // saving error
        }
      }
    useEffect(() => {
        storeData(data.championship)
    }, [data.championship])

    return(
        <ScrollView style={styles.view} contentContainerStyle={{ alignItems:"center"}}>
            {(gameInProgress.length>0) ? Object.values(data.championship).map((gameName,i)=>
                gameName.gameOver===false&& (
                    <View key={gameName.name} style={styles.container}>
                        <ImageBackground source={image} style={styles.image} imageStyle={{ borderRadius: 15}}>
                            <View style={styles.card} >
                                <View style={styles.title}><Text>Nom de la partie: </Text><Text style={styles.gamename}>{gameName.name}</Text></View>
                                <View style={styles.playersContainer}>
                                    <Text>Joueurs: </Text>
                                    <View style={styles.players}>
                                        {gameName.player.map((joueur,i)=><Text style={{color:"#427AA1"}} key={i}>{joueur.name}  </Text>)}
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button  color="#A7001E" title="Effacer" onPress={()=>deleteGame(gameName.name)}></Button>
                                    <Button color="#18534F" title="Continuer" onPress={()=>handlePress(gameName.name)}></Button>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                )
                ):(<Text>Aucune partie en cours</Text>)}
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        width:"100%",
        height:"100%",          
    },
    container:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop:20,
        borderRadius:25,
        width:"90%",
        backgroundColor:"blue",
        flex:1
    },
    view:{
        backgroundColor:"white",
    },
    card:{
        backgroundColor:"rgba(255,255,255,0.7)",
        padding:30,
        borderRadius:15,

    },
    gamename:{
        fontSize:20,
        color:"#427AA1",
        alignSelf:"center"
    },
    title:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        marginBottom:30,
    },
    playersContainer:{
        flex:1,
        flexDirection:"row",
        width:"100%"
    },
    players:{
        flexWrap:"wrap",
        height:50,
        marginBottom:30,
        marginLeft:10,
        width:"80%",
        flexDirection:"row"
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        flex:1,
    }
})


export default Continue