import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ListIngredient} from '../../types/listsTypes';

interface ListItemCardProps {
  ingredient: ListIngredient;
}

const ListItemCard = ({ingredient}: ListItemCardProps) => {
  const [showQuantity, setShowQuantity] = useState(false);
  return (
    <View style={styles.main}>
      <TouchableOpacity
        onPress={() => {
          setShowQuantity(!showQuantity);
        }}
        style={styles.mainContainer}>
        <View style={styles.image}>
          <Image
            style={{width: 40, height: 40, borderRadius: 200}}
            source={{
              uri: `https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`,
            }}
          />
        </View>
        <Text style={styles.name}>{ingredient.name}</Text>
        <Text style={styles.number}>{ingredient.number}</Text>
      </TouchableOpacity>
      {showQuantity && (
        <View style={styles.quantities}>
          {ingredient.quantities.map((quantity, index) => (
            <Text key={index}>{quantity} - </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  image: {width: '20%'},
  name: {width: '50%', fontSize: 20},
  number: {width: '20%', fontSize: 20},
  quantities: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'gray',
    width: '85%',
    padding: 5,
  },
});

export default ListItemCard;
