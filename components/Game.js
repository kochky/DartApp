import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React,{ useState, useEffect } from 'react'
import ScoreRow from './ScoreRow';
import { UserContext } from '../Context'


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
       <View style={styles.nameContainer}>
           <View style={styles.centeredView}>
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
            </View>
            <View><Text>{gameName}</Text></View>
            <View style={styles.row}>
                <Text style={styles.text}>Joueur</Text>
                <Text style={styles.text}>Victoires</Text>
                <Text style={styles.text}>Etoiles</Text>
                {data.isEnabled ? <Text style={styles.text}>Points restant</Text>:<Text style={styles.text}>Ajout Victoire</Text>}
            </View>
            {Object.values(data.names).map((name,index)=>
                <ScoreRow  step={step} setStep={setStep}  index={index} name={name} key={index}/>
                )}
            {data.championship[gameName]["duel"] && <Text>Egalité et donc duel !</Text>}
            {(step===0 && data.championship[gameName]["ballDeMatch"]) && (<View><Text>Il manque une victoire à</Text>{data.championship[gameName]["player"].map(joueur=>(joueur.victory===leader[leader.length-1]) && <Text key={joueur.name}>{joueur.name}</Text>)}<Text>pour l'étoile</Text></View>)}
        </View>
    )}else {return(
    <View></View>)}
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