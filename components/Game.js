import { StyleSheet, Text, View, Modal, Pressable,ImageBackground,Image } from 'react-native';
import React,{ useState, useEffect } from 'react'
import ScoreRow from './ScoreRow';
import { UserContext } from '../Context'
import image from '../ressources/pexels-thet-zin-6350012.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';



function Game({navigation}){
    const data = React.useContext(UserContext); 

    const [points,setPoints]=useState()
    const [loaded,setLoaded]=useState(false)
    const [step,setStep]=useState(0)
    const [winnerName,setWinnerName]=useState(false)
    const [leader,setLeader]=useState(false)

    const gameName=data.gameName
    let diff=0
    let diffStar=0
    const score=[]
    const stars=[]

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
    
    useEffect(() => {
        if(data.newGame){
        //Met tout les infos dans le state championship
          if(data.troiscentun){
              setPoints(301)
          }
          else {
              setPoints(501)
          }
        
          const game={
              name:gameName,
              player:[],
              301:points,
              decompte:data.isEnabled,
              victoryRemaining:10,
              starRemaining:5,
              winner:"",
              gameOver:false,
              duel:false,
              ballDeMatch:false
          }
          if(points){
          Object.values(data.names).map((name)=>game.player.push({name,victory:0,star:0,points:points,inDuel:true,winner:false}))
          data.setChampionship({...data.championship,[data.gameName]:game},setLoaded(true))
          }
        }else {
            setLoaded(true)
            data.championship[gameName]["player"].map((player)=>score.push(player.victory))
            score.sort()
            setLeader(score)
        } 
    }, [points])
  
    useEffect(() => {
        //verifie qu'il reste des parties en cours et compare les scores 
        if (loaded && step===1) {
            setStep(0)
            data.championship[gameName]["player"].map((player)=>score.push(player.victory))
            score.sort()
            setLeader(score)
            diff= score[score.length-1]-score[score.length-2]-data.championship[gameName]["victoryRemaining"]
            //reinitialise les scores et rajoute une étoile au gagnant
            if((diff>0 && data.championship[gameName]["victoryRemaining"]>=0)||data.championship[gameName]["victoryRemaining"]<0 ){
                setStep(2)
                data.setChampionship( state =>({
                    ...state,
                        [gameName]:{
                            ...state[gameName],
                            ["duel"]:false,
                            ["ballDeMatch"]:false,
                            ["victoryRemaining"]:10,
                            ["starRemaining"]:state[gameName]["starRemaining"]-1,
                            ['player']:state[gameName]["player"].map((players)=>
                                players.victory===score[score.length-1] ? {
                                    ...players,
                                    ["star"]: players["star"]+1,
                                    ["victory"]:0,
                                    ["inDuel"]:true                                    
                                }:  {...players,
                                    ["victory"]:0,
                                    ["inDuel"]:true                                    
                                }
                            )
                        }   
                              
                }))

            }else if (diff===0 && data.championship[gameName]["victoryRemaining"]===0){//s'il y a égalité, il a un duel
                data.setChampionship(state=> ({
                    ...state,
                        [gameName]:{
                            ...state[gameName],
                            ["ballDeMatch"]:false,
                            ["duel"]:true,
                            ['player']:state[gameName]["player"].map((players)=>
                                players.victory!==score[score.length-1] ? {
                                    ...players,
                                    ["inDuel"]:false                  
                                }:players  
                            )
                        }   
                    })     
                )      
            }else if ((diff===0 || diff===-1) && data.championship[gameName]["victoryRemaining"]>0){
                data.setChampionship( state =>({
                    ...state,
                        [gameName]:{
                            ...state[gameName],
                            ["ballDeMatch"]:true
                        }
                }))
                    
            }
        } //Donne la victoire à la personne qui a le plus d'étoile et s'il ne peut pas être rattrapé par les autres joueurs
        else if (loaded && step===2 ) {
            data.championship[gameName]["player"].map((player)=>stars.push(player.star))
            stars.sort()
            diffStar= stars[stars.length-1]-stars[stars.length-2]-data.championship[gameName]["starRemaining"]
            setStep(0)
            if((diffStar>0 && data.championship[gameName]["starRemaining"]>=0)||data.championship[gameName]["starRemaining"]<0 ){
                setStep(3)
                data.setChampionship(state=> ({
                   ...state,
                        [gameName]:{
                            ...state[gameName],
                            ["gameOver"]:true,
                            ["starRemaining"]:0,
                            ['player']:state[gameName]["player"].map((players)=>
                                players.star===stars[stars.length-1] ?({
                                    ...players,
                                    ["winner"]:true,
                                                                     
                                }):players
                            ),                         
                        }   
                               
                }))
            }else if (diffStar===0 && data.championship[gameName]["starRemaining"]===0){//s'il y a égalité d'étoiles, il y a un duel
                data.setChampionship(state=> (
                     {...state,
                        [gameName]:{
                            ...state[gameName],
                            ["duel"]:false,
                            ['player']:state[gameName]["player"].map((players)=>
                                players.star!==stars[stars.length-1] ? {
                                    ...players,
                                    ["inDuel"]:false                  
                                }:players  
                            )
                        }   
                    }   
                ))      
            }
            
        }
        else if(loaded && step===3){
            setStep(1)
            if(data.championship[gameName]["gameOver"]){
                let winnerName=""
                data.championship[gameName]["player"].map(winner=>winner["winner"] && ( winnerName=winner["name"]))
                data.setChampionship(state=>({
                    ...state,
                    [gameName]:{
                        ...state[gameName],
                        ["winner"]:winnerName
                    }
                }))
                setWinnerName(true)
            }  
        }



    }, [step])
    

    if(loaded){return( 
        <ImageBackground source={image} style={styles.image}>    

       <View style={styles.nameContainer}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={winnerName}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{data.championship[gameName]["winner"]} a  gagné le championnat {gameName} !</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => navigation.navigate('Menu')}
                            >
                            <Text style={styles.textStyle}>Retour Menu</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            <View style={styles.quitContainer}>
                <Pressable 
                style={{width:30,height:15}}
                onPress={() => navigation.popToTop()}
                >
                    <Image 
                        source={require("../ressources/quit.png")}
                        style={{width:15,height:15}}
                        >
                    </Image>
                </Pressable>
            </View>

            <Text style={styles.title}>{gameName}</Text>
            <View style={styles.messageContainer}>
                {data.championship[gameName]["duel"] && <Text style={styles.message}>Egalité et donc duel !</Text>}
                {(step===0 && data.championship[gameName]["ballDeMatch"]) && (<View style={styles.messageContainer,{flexDirection:"row"}}><Text style={styles.message}>Il manque une victoire à </Text>{data.championship[gameName]["player"].map(joueur=>(joueur.victory===leader[leader.length-1]) && <Text style={styles.message} key={joueur.name}>{joueur.name} </Text>)}<Text style={styles.message}>pour l'étoile</Text></View>)}
            </View>
            <View style={{flex:16,width:"100%"}} >
                <View style={styles.row}>
                    <View style={{flex:2,flexDirection:"row"}}>
                        <Text style={styles.text}>JOUEUR</Text>
                    </View>
                    <Text style={styles.text}>VICTOIRE</Text>
                    {data.isEnabled ? <Text style={styles.text}>POINTS RESTANT</Text>:<Text style={styles.text}>AJOUT VICTOIRE</Text>}
                </View>
                {data.championship[gameName]["player"].map((name,index)=>
                    <ScoreRow  step={step} setStep={setStep}  index={index} name={name.name} key={index}/>
                )}

            </View>
        </View>
        </ImageBackground>

    )}else {return(
    <View></View>)}
}

const styles = StyleSheet.create({
    nameContainer:{
        backgroundColor:"rgba(24,83,79,0.5)",
        alignItems: 'center',
        justifyContent: 'space-around',
        width:"100%",
        height:"100%"
    },
    quitContainer:{
        flex:1,
        justifyContent:"center",
        alignItems: 'flex-end',
        width:"100%",
    },
    scoreRowContainer:{
        backgroundColor:"#ECF8F6",
        flex:1,
    },
    image: {
        flex: 1,
        width:"100%",
        height:"100%",
      },
    title:{
        fontSize:26,
        color:"white",
        flex:2,
        width:"100%",
        textAlign:"center",
        textAlignVertical:"center",
    },
    row:{
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection:'row',
        width:"100%",
        textAlign:"center",
        marginBottom:20,
        color:"black"
    },
    text:{
        textAlign:"center",
        flex:1,
        color:"white"
    },
    message:{
        color:"#226D68",
    },
    messageContainer:{
        flex:2,
        alignItems: 'center',
        justifyContent: 'space-around',
        width:"100%",
        width:"90%",
        marginBottom:20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#18534F",
    },
    textStyle: {
        color: "#ECF8F6",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
export default Game