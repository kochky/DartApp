import { StyleSheet, Text, View, Switch, Button,TextInput } from 'react-native';
import React,{ useState, useEffect } from 'react'
import { UserContext } from '../App';

function Options({navigation}){

    const data = React.useContext(UserContext); 

    const toggleSwitch = () => data.setIsEnabled(previousState => !previousState);
    const secondToggleSwitch = () => data.setTroiscentun(previousState => !previousState);

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
            {data.gameName!='' && <Button style={{flex:2}} title="Valider"color="#18534F"  onPress={() => navigation.navigate('Select players')} ></Button>}
            
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