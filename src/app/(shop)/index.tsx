import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ProductListItem } from '../../components/product-list-item';
import { ListHeader } from '../../components/list-header';
import { getProductsAndCategories } from '../api/api';


const index = () => {
  const {data, error, isLoading} = getProductsAndCategories();

  if(isLoading){
    return <ActivityIndicator />
  }

  if(error || !data){
    return <Text>Error: {error?.message || 'An error occured'}</Text>
  }

  return (
    <View>
      <FlatList 
      data={data.products}
      keyExtractor={item=> item.id.toString()
      } 
      numColumns={2}
      ListHeaderComponent={<ListHeader categories={data.categories}/>}
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