import { FlatList, ListRenderItem, StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Tables } from '../../../types/database.types'
import { getMyOrders } from '../../api/api'
import { format } from 'date-fns'


const statusDisplayText = {
  InTransit: 'In Transit',
  Pending: 'Pending',
  Completed: 'Completed',
  Shipped: 'Shipped'

}

const renderItem: ListRenderItem<Tables<'order'>> = ({item})=> <Link href={`/orders/${item.slug}`} asChild>
<Pressable style={styles.orderContainer}>
  <View style={styles.orderContent}>
    <View style={styles.orderDetailContainer}>
      <Text style={styles.orderItem}>{item.slug}</Text>
      <Text style={styles.orderDetails}>{item.description}</Text>
      <Text style={styles.orderDate}>{
      format(new Date(item.created_at), 'MMM dd, yyyy')
      }</Text>
    </View>
    <View style={[styles.statusBadge, styles[`statusBadge_${item.status}`]]}>
      <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
    </View>
  </View>
</Pressable>

</Link>

const Orders = () => {
  const { data, error, isLoading } = getMyOrders();

  if(isLoading) return <ActivityIndicator />
  if(error || !data) return <Text>Error: {error?.message}</Text>
  if(!data.length) return <Text>No orders created yet!</Text>
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Orders'}} />
      <FlatList 
      data={data} 
      keyExtractor={item=> item.id.toString()} 
      renderItem={renderItem}
      />
    </View>
  )
}

export default Orders;

const styles: { [key: string]: any } = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  orderContainer: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8
  },
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  orderItem: {
    fontSize: 18,
    color: '#555'
  },
  orderDetailContainer:{
    flex: 1
  },
  orderDetails: {
    fontSize: 14,
    color: '#555'
  },
  orderDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff'
  },
  statusBadge_Pending: {
    backgroundColor: '#ffcc00'
  },
  statusBadge_Completed: {
    backgroundColor: '#4caf50'
  },
  statusBadge_Shipped: {
    backgroundColor: '#2196f3'
  },
  statusBadge_InTransit: {
    backgroundColor: '#ff9800'
  }
})