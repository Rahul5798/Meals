import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import { useLayoutEffect } from "react";
import MealDetails from "../components/MealDeatails";
import SubTitle from "../components/mealDetail/SubTilte";
import List from "../components/mealDetail/List";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, removeFavorites } from "../store/redux/favorites";

function MealDetailScreen({ route, navigation }) {
  const favoriteMealIds = useSelector((state) => state.favorites.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const isMealFavorite = favoriteMealIds.includes(mealId);

  function changeFavoriteStateHandler() {
    if (isMealFavorite) {
      dispatch(removeFavorites({ id: mealId }));
    } else {
      dispatch(addFavorites({ id: mealId }));
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
      headerRight: () => {
        return (
          <IconButton
            icon={isMealFavorite ? "star" : "star-outline"}
            color={"white"}
            onPress={changeFavoriteStateHandler}
          />
        );
      },
    });
  }, [selectedMeal, changeFavoriteStateHandler, navigation]);
  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <View>
        <MealDetails
          affordability={selectedMeal.affordability}
          duration={selectedMeal.duration}
          complexity={selectedMeal.complexity}
          textStyle={styles.detailText}
        />
      </View>
      <View style={styles.listOuterContaimer}>
        <View style={styles.listContainer}>
          <SubTitle>Ingredients</SubTitle>
          <List data={selectedMeal.ingredients} />
          <SubTitle>Steps</SubTitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}
export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "#D7CCC8",
  },
  detailText: {
    color: "#D7CCC8",
  },
  subTitle: {
    color: "#e2b497",
    margin: 4,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  subTitleContainer: {
    padding: 6,
    marginHorizontal: 24,
    marginVertical: 4,
    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
  },
  listOuterContaimer: {
    alignItems: "center",
  },
  listContainer: { maxWidth: "80%" },
});
