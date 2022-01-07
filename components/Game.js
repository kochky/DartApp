import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React,{ useState, useEffect } from 'react'
import ScoreRow from './ScoreRow';
import { UserContext } from '../App';


function Game({navigation}){
    const data = React.useContext(UserContext); 
    
    const [points,setPoints]=useState()
    const [loaded,setLoaded]=useState(false)
    const [newVictory,setNewVictory]=useState(0)
    const [newStar,setNewStar]=useState(0)

    const gameName=data.gameName
    let diff=0
    let diffStar=0


    useEffect(() => {
        const score=[]
        //verifie qu'il reste des parties en cours et compare les scores 
        if (loaded) {
            data.championship[gameName]["player"].map((player)=>score.push(player.victory))
            score.sort()
            diff= score[score.length-1]-score[score.length-2]-data.championship[gameName]["victoryRemaining"]
            
            //reinitialise les scores et rajoute une étoile au gagnant
            if((diff>0 && data.championship[gameName]["victoryRemaining"]>=0)||data.championship[gameName]["victoryRemaining"]<0 ){
                data.setChampionship( state =>({
                    ...state,
                        [gameName]:{
                            ...state[gameName],
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
                setNewStar(prevState=>prevState+1)

            }else if (diff===0 && data.championship[gameName]["victoryRemaining"]===0){//s'il y a égalité, il a un duel
                data.setChampionship(state=> ({
                    ...state,
                        [gameName]:{
                            ...state[gameName],
                            ['player']:state[gameName]["player"].map((players)=>
                                players.victory!==score[score.length-1] ? {
                                    ...players,
                                    ["inDuel"]:false                  
                                }:players  
                            )
                        }   
                    })     
                )      
            }
        }
       
    }, [newVictory])
    
     useEffect(() => {
         //Donne la victoire à la personne qui a le plus d'étoile et s'il ne peut pas être rattrapé par les autres joueurs
       const stars=[]
        if (loaded) {
            data.championship[gameName]["player"].map((player)=>stars.push(player.star))
            stars.sort()
            diffStar= stars[stars.length-1]-stars[stars.length-2]-data.championship[gameName]["starRemaining"]
            if((diffStar>0 && data.championship[gameName]["starRemaining"]>=0)||data.championship[gameName]["starRemaining"]<0 ){
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
     }, [newStar]) 

     useEffect(() => {
         //map tout les joueurs pour trouver le gagnant
        if(loaded){
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
            }  
        }
     }, [data.championship])

    useEffect(() => {
      //Met tout les infos dans le state championship
        if(data.troiscentun){
            setPoints(301)
        }
        else {
            setPoints(501)
        }
        const game={
            player:[],
            301:points,
            decompte:data.isEnabled,
            victoryRemaining:10,
            starRemaining:5,
            winner:"",
            gameOver:false
        }
        if(points){
        Object.values(data.names).map((name)=>game.player.push({name,victory:0,star:0,points:points,inDuel:true,winner:false}))
        data.setChampionship({...data.championship,[data.gameName]:game},setLoaded(true))
        }  
      }, [points])

    if(loaded){return( 
       <View style={styles.nameContainer}>
           <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={data.championship[gameName]["gameOver"]}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{data.championship[gameName]["winner"]} a  gagné !</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => navigation.navigate('Menu')}
                        >
                        <Text style={styles.textStyle}>Retour Menu</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Joueur</Text>
                {data.isEnabled && <Text style={styles.text}>Points restant</Text>}
                <Text style={styles.text}>Victoires</Text>
                <Text style={styles.text}>Etoiles</Text>
                <Text style={styles.text}>Ajout Victoire</Text>
            </View>
            {Object.values(data.names).map((name,index)=>
                <ScoreRow  setNewVictory={setNewVictory} index={index} name={name} key={index}/>
                )}
        </View>
    )}else {return('')}
}

const styles = StyleSheet.create({
    nameContainer:{
       
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",
    },
      row:{
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
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
    })
export default Game