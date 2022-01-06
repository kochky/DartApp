import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import image from '../ressources/pexels-thet-zin-6350012.jpg'



function Menu ({ navigation }) {
    return (
        <View style={styles.container}>
          <ImageBackground source={image} style={styles.image}>
            <View style={{flex:2}} ></View>
            <View style={{flex:1}}>
              <Button title="Nouvelle Partie" color="#18534F"  onPress={() => navigation.navigate('Options')} ></Button>
              <Button title="Continuer Partie" color="#18534F"onPress={() => navigation.navigate('Game')}></Button>
            </View>
          </ImageBackground>
        </View>
      );

}

export default Menu

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
    },
  });