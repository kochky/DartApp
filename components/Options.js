import { StyleSheet, Text, View, Switch, Button,TextInput,Modal, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react'
import { UserContext } from '../Context'
import image from '../ressources/pexels-thet-zin-6350012.jpg'

function Options({navigation}){

    const data = React.useContext(UserContext); 

    const [alreadyUse,setAlreadyUse]=useState(false)
    const [visible,setVisible]=useState(false)

    const toggleSwitch = () => data.setIsEnabled(previousState => !previousState);
    const secondToggleSwitch = () => data.setTroiscentun(previousState => !previousState);
    useEffect(() => {
      data.setNewGame(true)
      data.setGameName('')
      
    }, [])


        useEffect(() => {
            const listener= navigation.addListener(
                    'focus', () => {
                       setAlreadyUse(false)
                    }
                );
            return listener
            }, [])

    useEffect(() => {
        if(alreadyUse === true){
           setVisible(true)     
         }else if (!alreadyUse){
             setVisible(false)
         }else if (alreadyUse==="complete"){
            navigation.navigate('Select players')
         }
      }, [alreadyUse])
  
    function verifyGameName(){
        setAlreadyUse("complete")
        Object.keys(data.championship).map((name,i)=>name===data.gameName && setAlreadyUse(true))
    }

    return (
        <ImageBackground source={image} style={styles.image}>    
            <View style={styles.container}>
                   <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder="Nom de la partie"
                            placeholderTextColor="white"
                            style={styles.textInput}
                            onChangeText={text=>data.setGameName(text.toUpperCase())}
                        />
                    </View>
                    <View style={styles.points}> 
                        <Text style={{ flex:1,color:"white"}}>Points de départ: </Text>
                        <View style={styles.valueContainer}> 
                        {!data.troiscentun ? <Text style={{color:"#E2E9C0"}}>   501</Text>: <Text style={{color:"white"}}>   501</Text>}
                            <Switch 
                                trackColor={{true: 'white', false: 'white'}}
                                thumbColor={"white"}
                                onValueChange={secondToggleSwitch}
                                value={data.troiscentun}
                            />
                            {data.troiscentun ? <Text style={{color:"#E2E9C0"}}>   301</Text>: <Text style={{color:"white"}}>   301</Text>}
                        </View>   
                    </View>
                    <View style={styles.decompte}>
                        <Text style={{ flex:1,color:"white"}}>Décompte des points   </Text> 
                        <View style={styles.valueContainer}> 
                            <Switch 
                            onValueChange={toggleSwitch}
                            value={data.isEnabled}
                            
                            />
                        </View>   

                    </View> 
                    <View style={styles.validateButton}>{data.gameName!='' && <Button  title="Valider"color="#18534F"  onPress={() =>verifyGameName()} ></Button>}</View>

                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text>Le nom de la partie est déja utilisée, si vous continuer la partie sera écrasée.</Text>
                                <View style={styles.buttonContainer}>
                                    <Button  color="#18534F"  onPress={()=>(setAlreadyUse(false),navigation.navigate('Select players'))} title="Continuer"></Button>
                                    <Button  color="#A7001E" onPress={()=>setAlreadyUse(false)} title="Changer"></Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
            </View>
         </ImageBackground>


  
      )
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"rgba(24,83,79,0.5)",
    },
    validateButton:{
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
    },
    textInput: {
        textAlign:"center",
        borderRadius:15,
        height:50,
        borderWidth: 1,
        borderColor:"#18534F",
        color:"#E2E9C0",
        fontSize:20,
        width:"90%",    
    },
    textInputContainer: {
        width:"100%",
        textAlign:"center",
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    decompte:{
        flex:1,
        flexDirection:"row",
        width:"90%",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    points:{
        flex:1,
        width:"90%",
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        flex: 1,
        width:"100%",
        height:"100%",
    },
    valueContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:"row"
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
        elevation: 5,
        width:"90%"
    },
    buttonContainer:{
        flexDirection:"row",
        marginTop:30,
        justifyContent:'space-around',
        width:"100%",
    }
})


export default Options