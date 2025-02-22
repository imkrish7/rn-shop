import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Ionicons} from '@expo/vector-icons'

const CategoryLayout = () => {
  return (
  <Stack>
    <Stack.Screen  name="[slug]" options={({ navigation })=>({
      headerShown: true,
      headerLeft: ()=>{
      return <TouchableOpacity>
        <Ionicons name="arrow-back" size={24} color='black' onPress={()=>{

        }}/>
      </TouchableOpacity>
    }})}/>
    {/* <Stack.Screen  name=""/> */}
  </Stack>
  )
}

export default CategoryLayout;