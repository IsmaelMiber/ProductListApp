import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
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
import { useThemeColors } from '../theme/colors';

function ProductList() {
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const colors = useThemeColors();

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

  const hasSelectedItems = selectedProductIds.length > 0;

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyIcon, { color: colors.textMuted }]}>📦</Text>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No products found
      </Text>
      <Text style={[styles.emptyMessage, { color: colors.textSecondary }]}>
        {searchQuery.trim().length >= 3
          ? 'Try adjusting your search terms'
          : 'Start searching to find products'}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Search (min 3 characters)"
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.sortButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={onSortBtnPress}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>{getSortByText()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.deleteButton,
              {
                backgroundColor: hasSelectedItems
                  ? colors.danger
                  : colors.border,
              },
            ]}
            onPress={deleteSelectedItems}
            disabled={!hasSelectedItems}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.buttonText,
                { color: hasSelectedItems ? '#FFFFFF' : colors.textMuted },
              ]}
            >
              Delete {hasSelectedItems ? `(${selectedProductIds.length})` : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        keyboardShouldPersistTaps="handled"
        key={isPortrait ? 'portrait' : 'landscape'}
        numColumns={isPortrait ? 1 : 2}
        data={sortedProducts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={!isPortrait ? styles.row : undefined}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 12,
  },
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortButton: {
    marginRight: 6,
  },
  deleteButton: {
    marginLeft: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    paddingTop: 8,
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ProductList;
