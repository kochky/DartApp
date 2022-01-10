import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React,{ useState, useEffect } from 'react'
import { UserContext } from '../Context'


function Points({index,increment}){
    const data = React.useContext(UserContext) 
    const gameName=data.gameName

    const [open,setOpen]=useState(false)
    const [playerScore,setPlayerScore]=useState(data.championship[gameName]["player"][index]["points"])
    const [prevPlayerScore,setPrevPlayerScore]=useState(0)
    const [timesPlayed,setTimesPlayed]=useState(0)

    function decreasePoints(point){
        timesPlayed===0 && setPrevPlayerScore(playerScore)
        setPlayerScore(prevState=>prevState-point)
        setTimesPlayed(prevState=>prevState+1)
            
    }

    useEffect(() => {
       setPlayerScore(data.championship[gameName]["player"][index]["points"])
    }, [data.championship[gameName]["player"][index]["points"]])

    useEffect(() => {
      
        if(timesPlayed===3 || playerScore<=0){
            setOpen(false)
            setTimesPlayed(0)
            if(playerScore<0){
                setPlayerScore(prevPlayerScore)

            }else {
                data.setChampionship(state=> (
                    {...state,
                        [gameName]:{
                            ...state[gameName],
                            ['player']:state[gameName]["player"].map((players,i)=>
                                i===index ? {
                                    ...players,
                                    ["points"]:playerScore                  
                                }: players
                            )
                        }   
                    }         
                ))
                if(playerScore===0){
                    increment()
                    data.setChampionship(state=> (
                        {...state,
                            [gameName]:{
                                ...state[gameName],
                                ['player']:state[gameName]["player"].map((players)=>({
                                 ...players,
                                    ["points"]:state[gameName]["301"]  
                                    })                    
                                )
                            }   
                        }         
                    ))  
                
                }  
            }        
        }
    }, [timesPlayed])

    const pointsArray=[]

    for(var i=1;i<21;i++){
        const value=i
        pointsArray.push(<View key={i} style={styles.row}><Pressable onPress={()=>decreasePoints(value)}><Text>{i}</Text></Pressable><Pressable onPress={()=>decreasePoints(value*2)}><Text>x2</Text></Pressable><Pressable onPress={()=>decreasePoints(value*3)}><Text>x3</Text></Pressable></View>
            )
    }

    return(
        <View style={styles.view}> 
            <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            >
                <View style={styles.modal}>
                    <Text>{playerScore}</Text>
                    <View style={styles.row}><Pressable onPress={()=>decreasePoints(0)}><Text>0</Text></Pressable><Text></Text><Text></Text></View>
                    {pointsArray}
                    <View style={styles.row}><Pressable onPress={()=>decreasePoints(25)}><Text>25</Text></Pressable><Pressable onPress={()=>decreasePoints(25*2)}><Text>x2</Text></Pressable><Text></Text></View>


                </View>
            </Modal>
            <Pressable
                onPress={()=>setOpen(true)}
            >
                <Text >{data.championship[gameName]["player"][index]["points"]}</Text>
            </Pressable>   
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flex:1
    },
    modal:{
        flex:1,
        margin:20,
        backgroundColor:"white"
    },
    row:{
        flex:1,
        flexDirection:'row',
        width:'80%',
        justifyContent:"space-around"
    }


})
export default Points