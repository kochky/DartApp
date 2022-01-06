import { StyleSheet, Text, View } from 'react-native';
import React, { useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './components/Menu'
import NbrPlayers from './components/NbrPlayers';
import PlayersNames from './components/PlayersNames';
import Game from './components/Game';
import Options from './components/Options';
export const UserContext = React.createContext();
const Stack = createNativeStackNavigator();

export default function App() {
  const [players,setPlayers]=useState(1)
  const [names,setNames]=useState({})
  const [championship,setChampionship]=useState({})
  const [troiscentun,setTroiscentun]=useState(false)
  const [isEnabled,setIsEnabled]=useState(false)
  const [gameName,setGameName]=useState("Game 1")

  return (  
    <UserContext.Provider value={{players:players,setPlayers:setPlayers,names:names,setNames:setNames,championship:championship,setChampionship:setChampionship,troiscentun:troiscentun,setTroiscentun:setTroiscentun,isEnabled:isEnabled,setIsEnabled:setIsEnabled,gameName:gameName,setGameName:setGameName}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Menu">
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Options" component={Options} />
          <Stack.Screen  name="Select players" component={NbrPlayers }/>
          <Stack.Screen  name="Select name"  component={PlayersNames}/>
          <Stack.Screen  name="Game" component={Game}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
