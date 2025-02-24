import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { ORDERS } from '../../../../assets/orders';

const OrderDetails = () => {
    const { slug } = useLocalSearchParams();
    const order= ORDERS.find(order => order.slug === slug);

    if (!order) return <Redirect href={`/404`} />
  return (
    <View style={styles.contianer}>
        <Stack.Screen  options={{title: `${order.item}`}}/>
      <Text style={styles.item}>{order.item}</Text>
      <Text style={styles.details}>{order.details}</Text>
      <View style={[styles.statusBadge, styles[`status_${order.status}`]]}>
        <Text style={styles.statusText}>{order.status}</Text>
      </View>
      <Text style={styles.date}>{order.date}</Text>
      <Text style={styles.itemsTitle}>Item Ordered</Text>
      <FlatList
        data={order.items}
        keyExtractor={item=> item.id.toString()}
        renderItem={({item})=>{
            return <View style={styles.orderItem}>
                    <Image source={item.heroImage} style={styles.herImage} />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.title}</Text>
                        <Text style={styles.itemPrice}>Price: ${item.price}</Text>
                    </View>
            </View>
        }}
      />
    </View>
  )
}

export default OrderDetails

const styles = StyleSheet.create({
    contianer:{
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    item: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8
    },
    itemsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
      },
    details: {
        fontSize: 16,
        marginBottom: 16
    },
    statusBadge: {
        padding: 8,
        borderRadius: 4,
        alignSelf: 'flex-start'
    },
    status_Pending: {
        backgroundColor: 'orange'
    },
    status_Completed: {
        backgroundColor: 'green'
    },
    status_Shipped: {
        backgroundColor: 'blue'
    },
    status_InTransit: {
        backgroundColor: 'purple'
    },
    statusText:{
        color: '#fff',
        fontWeight: 'bold'
    },
    date: {
        fontSize: 14,
        color: '#555',
        marginTop: 16,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 8
    },
    herImage:{
        width: '50%',
        height: 100,
        borderRadius: 10
    },
    itemInfo: {

    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemPrice: {
        fontSize: 14,
        marginTop: 4,
    }
})