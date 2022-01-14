import { StyleSheet, View, Button, ImageBackground } from 'react-native';
import React, { useLayoutEffect} from 'react'
import image from '../ressources/pexels-thet-zin-6350012.jpg'

function Menu ({ navigation }) {

  useLayoutEffect(() => {
    new Image().src=image
  }, [])

    return (
        <View style={styles.container}>
          <ImageBackground  source={image} style={styles.image}>    
            <View style={{flex:3}} ></View>
            <View style={{flex:1}}>
              <Button title="Nouvelle Partie" color="#rgba(24,83,79,0.7)"  onPress={() => navigation.navigate('Options')} ></Button>
              <Button title="Continuer Partie" color="#rgba(24,83,79,0.7)" onPress={() => navigation.navigate('Continue')}></Button>
              <Button title="Historique" color="#rgba(24,83,79,0.7)" onPress={() => navigation.navigate('Historique')}></Button>
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