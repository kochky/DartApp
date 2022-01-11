import  { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import { UserContext } from '../Context'
import React from 'react'

function NbrPlayers ({ navigation }){
    
    const data = React.useContext(UserContext); 

    return (
        <View style={styles.container}>
            <Text>Saisissez le nombre de joueurs</Text>
            <TextInput
                defaultValue={data.players.toString()}
                style={styles.input}
                onChangeText={players=>data.setPlayers(players)}
                keyboardType="numeric"
            />
            {(data.players<=8 && data.players>=2) && <Button title="Valider"color="#18534F"  onPress={() => navigation.navigate('Select name')} ></Button>}
            {(data.players>8 || data.players<2) && <Text style={styles.error}>Le nombre de joueurs doit être entre 2 et 8</Text>}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#18534F" 
      },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width:"10%",
        textAlign:'center'

      },
      error :{
          color:"red",
      }
  });
export default NbrPlayers