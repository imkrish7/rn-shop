import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { useToast } from 'react-native-toast-notifications';
import { PRODUCTS } from '../../../assets/products';
import { useCartStore } from '../../store/cart-store';

const Product = () => {
  const {slug} = useLocalSearchParams<{slug: string}>();
  const toast = useToast();
  const product = PRODUCTS.find(product => product.slug === slug);

  if(!product) return <Redirect href={'/404'} />

  const {items, addItem, incrementItem, decrementItem} = useCartStore();

  const cartItem = items.find(item=> item.id === product.id);

  const initialQuantity = cartItem ? cartItem.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = ()=>{

    if(quantity<product.maxQuantity){
      setQuantity(prev => prev+1);
      incrementItem(product.id);
    }else{
      toast.show('Cannot add more than maximum quantity', {
        type: 'warning',
        placement: 'top',
        duration: 1500
      })
    }

  }

  const decreaseQuantity = ()=>{
    if(quantity>1){
      setQuantity(prev=> prev-1);
      decrementItem(product.id);
    }else{
      toast.show('Cannot decrement less than 1', {
        type: 'warning',
        placement: 'top'
      })
    }
  }

  const addCart = ()=>{
      addItem({
        id: product.id,
        title: product.title,
        image: product.heroImage,
        price: product.price,
        quantity
      })

      toast.show('Added to Cart', {
        type: 'success',
        placement: 'top',
        duration: 1500
      })
  }

  const totalPrice = (product.price*quantity).toFixed(2);


  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product.title}} />
      <Image source={product.heroImage} style={styles.heroImage} />
      <View style={{ padding: 16, flex: 1}}>
        <Text style={styles.title}>Slug: {product.slug}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.prices}>Unit Price ${product.price.toFixed(2)}</Text>
          <Text style={styles.prices}>Total Price ${totalPrice}</Text>
        </View>

        <FlatList 
          data={product.imagesUrl}
          keyExtractor={(item, index)=> index.toString()}
          renderItem={({item})=>{
            return <Image source={item} style={styles.image} />
          }}

          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageContainer}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity} disabled={quantity <= 1}>
            <Text style={styles.quantityButtonText}>-</Text>

          </TouchableOpacity>
          <Text>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} disabled={quantity >= product.maxQuantity} onPress={increaseQuantity}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCart} onPress={addCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8
  },
  slug: {
    fontSize: 18,
    color: '#555',
    marginBottom: 16
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    marginLeft: 8,
    resizeMode: 'cover',
    borderRadius: 8
  },
  imageContainer:{
    marginBottom: 16,
    // borderRadius: 8
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  prices: {
    fontWeight: 'bold',
    color: '#000'
  },
  buttonContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#fff'
  },
  addToCart: {
    backgroundColor: '#28a745',
    flex: 1,
    paddingVertical:12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
}) 