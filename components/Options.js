import { StyleSheet, Text, View, Switch, Button,TextInput,Modal } from 'react-native';
import React, { useEffect, useState } from 'react'
import { UserContext } from '../Context'

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
        <View style={styles.container}>
            <TextInput
                placeholder="Nom de la partie"
                style={styles.textInput}
                onChangeText={text=>data.setGameName(text)}
            />
            <View style={styles.points}> 
                <Text>501</Text>
                <Switch 
                    onValueChange={secondToggleSwitch}
                    value={data.troiscentun}
                />
                <Text>301</Text>
            </View>
            <View style={styles.decompte}>
                <Text>Décompte des points</Text> 
                <Switch 
                    onValueChange={toggleSwitch}
                    value={data.isEnabled}
                />
            </View> 
            {data.gameName!='' && <Button style={{flex:2}} title="Valider"color="#18534F"  onPress={() =>verifyGameName()} ></Button>}
            <Modal
               animationType="slide"
               transparent={true}
               visible={visible}>
                <View>
                    <Text>Le nom de la partie est déja utilisée, si vous continuer la partie sera écrasée.</Text>
                    <Button onPress={()=>(setAlreadyUse(false),navigation.navigate('Select players'))} title="Continuer quand même"></Button>
                    <Button onPress={()=>setAlreadyUse(false)} title="Changer le nom"></Button>

                </View>
            </Modal>
            
        </View>

  
      )
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#18534F",
        padding:20, 
    },
    textInput: {
        flex:1,
        textAlign:"center"
    },
    decompte:{
        flex:1
    },
    points:{
        flex:1,
        flexDirection:"row"
    }
    })


export default Options