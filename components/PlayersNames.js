import { StyleSheet, Text, View, Button, ImageBackground,TextInput } from 'react-native';
import React from 'react'
import {UserContext} from '../App'

function NameInput({data,i}){
  
  const createPlayer = (newName) => {
    data.setNames({...data.names, [i]:newName});
  };

    return(
      <TextInput
        key={i}
        defaultValue={data.names[i]}
        style={styles.input}
        onChangeText={createPlayer}
        placeholder={`Joueur ${i+1}`} 
      />
    )
}

function PlayersNames({ navigation}){
  const data = React.useContext(UserContext); 
  const textInputNames=[];
  for (var i=0; i<data.players;i++){
      textInputNames.push(NameInput({data,i}))
  }

  
    
    return (
        <View style={styles.container}>
            <Text style={{flex:1}}>Saisissez les prénoms</Text>
            <View style={styles.inputContainer}>
                {textInputNames}
            </View>
            {Object.keys(data.names).length===parseInt(data.players) && <Button style={{flex:2}} title="Valider"color="#18534F"  onPress={() => navigation.navigate('Game')} ></Button>}
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
      inputContainer:{
        flex:7,
        width:"100%",
      },
    input: {
        margin: 12,
        borderWidth: 1,
        textAlign:'center',
        color:'white',
      },
  });
export default PlayersNames