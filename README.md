# ProductListApp

A React Native application for displaying and managing a list of products with search, sorting, and selection capabilities.

## Features

- 📱 **Product List Display**: Browse through a comprehensive list of products
- 🔍 **Search Functionality**: Search products by title or tags (minimum 3 characters)
- 🔄 **Sorting Options**: Sort products by price (ascending, descending, or none)
- ✅ **Product Selection**: Select and manage multiple products
- 🌓 **Dark Mode Support**: Automatic theme switching based on system preferences
- 📐 **Responsive Design**: Adapts to portrait and landscape orientations
- 🎨 **Modern UI**: Clean and intuitive user interface with smooth interactions

## Tech Stack

- **React Native** 0.82.1
- **React** 19.1.1
- **TypeScript** 5.8.3
- **React Native Safe Area Context** - For safe area handling
- **Node.js** >= 20

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js >= 20 installed
- React Native development environment set up
  - For iOS: Xcode and CocoaPods
  - For Android: Android Studio and Android SDK
- Follow the [React Native Environment Setup Guide](https://reactnative.dev/docs/set-up-your-environment)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/IsmaelMiber/ProductListApp.git
cd ProductListApp
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install CocoaPods dependencies:
```bash
# First time setup
bundle install

# Install pods
cd ios
bundle exec pod install
cd ..
```

## Running the App

### Start Metro Bundler

```bash
npm start
```

### Run on iOS

```bash
npm run ios
```

### Run on Android

```bash
npm run android
```

## Project Structure

```
ProductListApp/
├── src/
│   ├── backend/
│   │   └── productList.json      # Product data source
│   ├── components/
│   │   ├── ProductList.tsx        # Main product list component
│   │   └── ProductItem.tsx       # Individual product item component
│   ├── enums/
│   │   └── Sort.ts               # Sorting enum definitions
│   ├── theme/
│   │   └── colors.ts             # Theme colors (light/dark mode)
│   └── types/
│       └── product.ts            # Product type definitions
├── App.tsx                        # Root application component
├── package.json                   # Project dependencies
└── README.md                      # This file
```

## Usage

### Searching Products

- Type at least 3 characters in the search bar
- Search matches product titles and tags
- Clear the search to show all products

### Sorting Products

- Use the sort buttons to organize products by price:
  - **None**: Original order
  - **Ascending**: Lowest to highest price
  - **Descending**: Highest to lowest price

### Selecting Products

- Tap on products to select/deselect them
- Selected products are visually highlighted
- Selection state persists during search and sort operations

## Features in Detail

### Product Data

Products are loaded from `src/backend/productList.json`. Each product contains:
- `id`: Unique identifier
- `title`: Product name
- `description`: Product description
- `image`: Product image URL
- `price`: Product price
- `tags`: Array of product tags

### Theme Support

The app automatically adapts to your device's theme preference:
- Light mode: Clean white background with dark text
- Dark mode: Dark background with light text