import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react'
import { UserContext } from '../Context'
import Star from './Star';
import Points from './Points';


function ScoreRow({ name,index,step,setStep}){
    const data = React.useContext(UserContext); 
    const gameName=data.gameName
  

    function increment(){
        //Ajoute une victoire quand on clique sur le bouton, s'il s'agit du grand duel (plus de partie restantes ni d'étoiles), offre la victoire au champion
        if(step===0){
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

            }else if (data.championship[gameName]["starRemaining"]===0) {
                data.setChampionship(state=> (
                {...state,
                        [gameName]:{
                            ...state[gameName],
                            ["gameOver"]:true,
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
            setStep(1)
        }
    }

   
    
    return (
        <View  style={styles.row}>
            <View style={{flex:1,flexDirection:"row"}}>
                <Star index={index} />
                <Text style={styles.text}>{name}</Text>
            </View>
            <Text style={styles.text}>{data.championship[gameName]["player"][index]["victory"]}</Text>
            {(data.isEnabled && data.championship[gameName]["player"][index]["inDuel"]) ? <Points increment={increment} index={index} />:(<Text style={styles.text}><Button style={{flex:1,width:'100%'}} color="#226D68" onPress={()=>increment()} title="+" ></Button></Text>)}
            {!data.championship[gameName]["player"][index]["inDuel"] && <Text> </Text>}
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
          backgroundColor:"#ECF8F6"
      },
      text:{
        textAlign:"center",
        flex:1,
        color:"#226D68"
    }
  
    })

export default ScoreRow