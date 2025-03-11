import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useOrderUpdate } from '../../api/subscription'

const OrdersLayout = () => {
  useOrderUpdate();
  return (
  <Stack>
    <Stack.Screen  name="index" options={{headerShown: false}}/>
    {/* <Stack.Screen  name=""/> */}
  </Stack>
  )
}

export default OrdersLayout