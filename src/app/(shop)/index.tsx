import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PRODUCTS } from '../../../assets/products'
import { ProductListItem } from '../../components/product-list-item';
import { ListHeader } from '../../components/list-header';


const index = () => {
  return (
    <View>
      <FlatList 
      data={PRODUCTS}
      keyExtractor={item=> item.id.toString()
      } 
      numColumns={2}
      ListHeaderComponent={ListHeader}
      renderItem={({item})=>{
        return <ProductListItem product={item}/>
      }} 
      contentContainerStyle={styles.flatListContent}
      columnWrapperStyle={styles.flatListColumnWrapper}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5
      }}
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumnWrapper: {
    justifyContent: "space-between"
  }
})