import { StyleSheet, Text, View, Modal, Pressable,ScrollView } from 'react-native';
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
        pointsArray.push(<View key={i} style={styles.row}><Pressable style={styles.pressable} onPress={()=>decreasePoints(value)}><Text style={styles.firstText}>{i}</Text></Pressable><Pressable style={styles.pressable} onPress={()=>decreasePoints(value*2)}><Text style={styles.doubleText}>x2</Text></Pressable><Pressable style={styles.pressable} onPress={()=>decreasePoints(value*3)}><Text style={styles.tripleText}>x3</Text></Pressable></View>
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
                    <Text style={styles.title}>Score: {playerScore} Fléchettes jouées: {timesPlayed}</Text>
                    <View style={styles.row}><Pressable  style={styles.pressable} onPress={()=>decreasePoints(0)}><Text style={styles.firstText}>0</Text></Pressable><Text style={{textAlign:"center",flex:1}}></Text><Text style={{textAlign:"center",flex:1}}> </Text></View>
                    {pointsArray}
                    <View style={styles.row}><Pressable style={styles.pressable} onPress={()=>decreasePoints(25)}><Text style={styles.firstText}>25</Text></Pressable><Pressable  style={styles.pressable} onPress={()=>decreasePoints(25*2)}><Text style={styles.doubleText}>x2</Text></Pressable><Text style={{textAlign:"center",flex:1}}></Text></View>
                </View>
            </Modal>

            <View style={styles.viewPressable}>
                <Pressable
                onPress={()=>setOpen(true)}
                style={styles.viewPressable}                >
                    <Text >{data.championship[gameName]["player"][index]["points"]}</Text>
                </Pressable> 
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:20,
        marginBottom:20,
        
    },
    pressable:{
        textAlign:"center",
        flex:1,alignItems:"center",
        justifyContent:"center",
        height:"100%"

    },
    firstText:{
        textAlign:"center",
        textAlignVertical:"center",
        flex:1,
        backgroundColor:"black",
        color:"white",
        width:25,
        borderRadius:25,
        height:25
    },
    doubleText:{
        textAlign:"center",
        textAlignVertical:"center",
        flex:1,
        color:"white",
        width:25,
        borderRadius:25,
        height:25,
        backgroundColor:"#7AA95C"
    },
    tripleText:{
        textAlign:"center",
        textAlignVertical:"center",
        flex:1,
        color:"white",
        width:25,
        borderRadius:25,
        height:25,
        backgroundColor:"#A7001E"
    },
    modal:{
        flex:1,
        margin:20,
        backgroundColor:"#f5efe6",
        marginTop:22,
        justifyContent:"center",
        alignItems:"center",
        borderColor:"#18534F",
        borderWidth:1,
        borderRadius:15,
        paddingBottom:10,

    },
    row:{
        flex:1,
        flexDirection:'row',
        width:'80%',
        justifyContent:"space-around",
        textAlign:"center",
        alignItems:"center",
        height:12,
        marginBottom:5,
       
    },
    viewPressable:{
        flex:1,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#A7001E",
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
    }


})
export default Points