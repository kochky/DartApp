import { StyleSheet } from 'react-native';
import React, { useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './components/Menu'
import NbrPlayers from './components/NbrPlayers';
import PlayersNames from './components/PlayersNames';
import Game from './components/Game';
import Options from './components/Options';
import Historique from './components/Historique';
import Continue from './components/Continue';
import { UserContext } from './Context'

const Stack = createNativeStackNavigator();

export default function App() {
  const [players,setPlayers]=useState(2)
  const [names,setNames]=useState({})
  const [championship,setChampionship]=useState({})
  const [troiscentun,setTroiscentun]=useState(false)
  const [isEnabled,setIsEnabled]=useState(false)
  const [gameName,setGameName]=useState("Game1")
  const [newGame,setNewGame]=useState(false)



  return (  
    <UserContext.Provider value={{newGame:newGame,setNewGame:setNewGame,players:players,setPlayers:setPlayers,names:names,setNames:setNames,championship:championship,setChampionship:setChampionship,troiscentun:troiscentun,setTroiscentun:setTroiscentun,isEnabled:isEnabled,setIsEnabled:setIsEnabled,gameName:gameName,setGameName:setGameName}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Options" component={Options} />
          <Stack.Screen  name="Select players" component={NbrPlayers }/>
          <Stack.Screen  name="Select name"  component={PlayersNames}/>
          <Stack.Screen  name="Game" component={Game}/>
          <Stack.Screen  name="Historique" component={Historique}/>
          <Stack.Screen  name="Continue" component={Continue}/>

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
