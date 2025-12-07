import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import productList from '../backend/productList.json';
import ProductItem from './ProductItem';
import Product from '../types/product';
import Sort from '../enums/Sort';

function ProductList() {
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;

  const [sortedBy, setSortedBy] = useState<Sort>(Sort.NONE);

  const [products, setProducts] = useState<Product[]>(productList);

  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const [searchQuery, setSearchQuery] = useState('');

  const searchedProducts = useMemo(() => {
    if (searchQuery.trim().length < 3) {
      return products;
    }
    return products.filter(
      item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }, [searchQuery, products]);

  const sortedProducts = useMemo(() => {
    switch (sortedBy) {
      case Sort.NONE:
        return searchedProducts;
      case Sort.ASC:
        return [...searchedProducts].sort((a, b) => a.price - b.price);
      case Sort.DESC:
        return [...searchedProducts].sort((a, b) => b.price - a.price);
    }
  }, [sortedBy, searchedProducts]);

  function sortProducts(sort: Sort) {
    setSelectedProductIds([]);
    setSortedBy(sort);
  }

  function onSortBtnPress() {
    switch (sortedBy) {
      case Sort.NONE:
        sortProducts(Sort.ASC);
        break;
      case Sort.ASC:
        sortProducts(Sort.DESC);
        break;
      case Sort.DESC:
        sortProducts(Sort.NONE);
        break;
    }
  }

  const onItemPress = useCallback(
    (item: Product) => {
      if (selectedProductIds.includes(item.id)) {
        setSelectedProductIds(selectedProductIds.filter(id => id !== item.id));
      } else {
        setSelectedProductIds([...selectedProductIds, item.id]);
      }
    },
    [selectedProductIds],
  );

  function deleteSelectedItems() {
    setProducts(products.filter(item => !selectedProductIds.includes(item.id)));
    setSelectedProductIds([]);
  }

  function getSortByText() {
    switch (sortedBy) {
      case Sort.NONE:
        return 'Sort by Price';
      case Sort.ASC:
        return 'Sort by Price (Ascending)';
      case Sort.DESC:
        return 'Sort by Price (Descending)';
    }
  }

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);
  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductItem
        product={item}
        onPress={onItemPress}
        isSelected={selectedProductIds.includes(item.id)}
      />
    ),
    [onItemPress, selectedProductIds],
  );

  return (
    <View>
      <TextInput
        placeholder="Search (min 3 characters)"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity onPress={onSortBtnPress}>
        <Text>{getSortByText()}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteSelectedItems}>
        <Text>Delete selected ({selectedProductIds.length})</Text>
      </TouchableOpacity>
      <FlatList
        key={isPortrait ? 'portrait' : 'landscape'}
        numColumns={isPortrait ? 1 : 2}
        data={sortedProducts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
}

export default ProductList;
