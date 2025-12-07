import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Product from '../types/product';
import { useThemeColors } from '../theme/colors';

function ProductItem({
  product,
  onPress,
  isSelected,
}: {
  product: Product;
  onPress: (item: Product) => void;
  isSelected: boolean;
}) {
  const colors = useThemeColors();

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(product)}
      activeOpacity={0.7}
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: isSelected ? colors.selectedBorder : colors.cardBorder,
          borderWidth: isSelected ? 2 : 1,
          ...Platform.select({
            ios: {
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              elevation: 2,
            },
          }),
        },
        isSelected && {
          backgroundColor: colors.selectedBackground,
        },
      ]}
    >
      <Image
        source={{ uri: product.image }}
        style={[
          styles.image,
          {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
        ]}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {product.title}
        </Text>
        <Text
          style={[styles.description, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {product.description}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.primary }]}>
            {formatPrice(product.price)}
          </Text>
        </View>
        <View style={styles.tagsContainer}>
          {product.tags.slice(0, 3).map((tag, index) => (
            <View
              key={index}
              style={[
                styles.tag,
                {
                  backgroundColor: colors.tagBackground,
                  marginRight: 6,
                  marginBottom: 4,
                },
              ]}
            >
              <Text style={[styles.tagText, { color: colors.tagText }]}>
                {tag}
              </Text>
            </View>
          ))}
          {product.tags.length > 3 && (
            <View
              style={[
                styles.tag,
                {
                  backgroundColor: colors.tagBackground,
                  marginRight: 6,
                  marginBottom: 4,
                },
              ]}
            >
              <Text style={[styles.tagText, { color: colors.tagText }]}>
                +{product.tags.length - 3}
              </Text>
            </View>
          )}
        </View>
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <View
              style={[styles.checkmark, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 8,
    overflow: 'hidden',
    flexGrow: 1,
    gap: 10,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F0F0',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  priceContainer: {
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductItem;
