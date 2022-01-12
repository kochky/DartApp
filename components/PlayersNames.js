import { StyleSheet, Text, View, Button,TextInput,ImageBackground,ScrollView } from 'react-native';
import React, { useState } from 'react'
import { UserContext } from '../Context'
import image from '../ressources/pexels-thet-zin-6350012.jpg'


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
        placeholderTextColor="white" 
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
      <ImageBackground source={image} style={styles.image}>    
        <View style={styles.container}>
            <Text style={{flex:1,color:"white",fontSize:20}}>Saisissez les prénoms</Text>
            <ScrollView style={styles.inputContainer}>
                {textInputNames}
            </ScrollView>
            <View style={{flex:1}}>{(Object.keys(data.names).length===parseInt(data.players)) && <Button style={{flex:2}} title="Valider"color="#18534F"  onPress={() => navigation.navigate('Game')} ></Button>}</View>
        </View>
      </ImageBackground>

    )
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      width:"100%",
      height:"100%",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"rgba(24,83,79,0.7)",
        paddingTop:"5%"
      },
      inputContainer:{
        // flex:7,
        width:"100%",
        // alignItems: 'center',
        // justifyContent: 'center',
      },
    input: {
        margin: 12,
        borderWidth: 1,
        borderColor:"#18534F",

        textAlign:'center',
        color:'#FEEAA1',
        width:"90%",
        borderRadius:15,
      },
  });
export default PlayersNames