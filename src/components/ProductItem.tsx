import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Product from '../types/product';

function ProductItem({
  product,
  onPress,
  isSelected,
}: {
  product: Product;
  onPress: (item: Product) => void;
  isSelected: boolean;
}) {
  return (
    <View>
      <TouchableOpacity onPress={() => onPress(product)}>
        <Image
          source={{ uri: product.image }}
          style={{ width: 100, height: 100 }}
        />
        <Text>{product.title}</Text>
        <Text>{product.description}</Text>
        <Text>{product.price}</Text>
        <Text>{product.tags.join(', ')}</Text>
        <View
          style={{
            backgroundColor: isSelected ? 'red' : 'white',
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default ProductItem;
