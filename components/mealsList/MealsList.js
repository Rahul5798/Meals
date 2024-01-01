import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealItem from "./MealItem";
function MealsList({ items }) {
  const navigation = useNavigation();
  function renderMealItem(itemData) {
    const item = itemData.item;
    function pressHandler() {
      navigation.navigate("MealDetailScreen", {
        mealId: item.id,
      });
    }

    const mealItemProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      complexity: item.complexity,
      affordability: item.affordability,
      duration: item.duration,
      onPress: pressHandler,
    };

    return <MealItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}
export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
