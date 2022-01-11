import { StyleSheet,Image, View } from 'react-native';
import React from 'react'
import { UserContext } from '../Context'

function Star ({index}){
    const data = React.useContext(UserContext); 
    const gameName=data.gameName
    const emptyStar=require('../ressources/star-regular.png')
    const solidStar=require('../ressources/star-solid.png')
    switch (data.championship[gameName]["player"][index]["star"]){
        case 0:
            return <View style={styles.starContainer}>
                        <Image 
                            style={styles.star}
                            source={emptyStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                    </View>;
                     break;
     
        case 1:
            return <View style={styles.starContainer}>
                        <Image 
                            style={styles.star}
                            source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                    </View>;
                    break;
        
        case 2:
            return <View style={styles.starContainer}>
                        <Image 
                            style={styles.star}
                            source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                    </View>;
                    break;
        
        case 3:
            return <View style={styles.starContainer}>
                        <Image 
                            style={styles.star}
                            source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                    </View>;
                    break;
        
        case 4:
            return <View style={styles.starContainer}>
                        <Image 
                            style={styles.star}
                            source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={emptyStar}
                        />
                    </View>;
                    break;
    
        case 5:
            return <View style={styles.starContainer}>
                        <Image 
                            style={styles.star}
                            source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={solidStar}
                        />
                        <Image 
                                style={styles.star}
                                source={solidStar}
                        />
                    </View>;
                    break;
            default:
                return <View></View>
        }                
}

const styles = StyleSheet.create({
    starContainer:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    star:{
        width:20,
        height:20,
        flex:1
    }
})

export default Star