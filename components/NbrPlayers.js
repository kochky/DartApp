import  { StyleSheet, Text, View, Button,TextInput, ImageBackground } from 'react-native';
import { UserContext } from '../Context'
import React from 'react'
import image from '../ressources/pexels-thet-zin-6350012.jpg'


function NbrPlayers ({ navigation }){
    
    const data = React.useContext(UserContext); 

    return (
        <ImageBackground source={image} style={styles.image}>    
        <View style={styles.container}>
            <Text style={{ color:'white'}}>Saisissez le nombre de joueurs</Text>
            <TextInput
                defaultValue={data.players.toString()}
                style={styles.input}
                onChangeText={players=>data.setPlayers(players)}
                keyboardType="numeric"
                placeholderTextColor="#000"
            />
            {(data.players<=8 && data.players>=2) && <Button title="Valider" color="#18534F"  onPress={() => navigation.navigate('Select name')} ></Button>}
            {(data.players>8 || data.players<2) && <Text style={styles.error}>Le nombre de joueurs doit être entre 2 et 8</Text>}
        </View>
        </ImageBackground>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor:"rgba(24,83,79,0.7)",
      },
    input: {
        height: 40,
        width:"30%",
        textAlign:'center',
        fontSize:20,
        borderRadius:15,
        borderWidth: 1,
        color:"#FEEAA1",
        borderColor:"#18534F",


      },
      error :{
          color:"red",
          width:"90%",
          textAlign:"center"
      },
      image: {
        flex: 1,
        width:"100%",
        height:"100%",
      },
  });
export default NbrPlayers