import { FlatList, StyleSheet, Text } from "react-native";
// Function for rendering, instead of passing function directly int oflatlis renderItem
function renderExpenseItem(itemData) {
  return <Text>{itemData.item.description}</Text>;
}
const ExpensesList = ({ expenses }) => {
  return <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item)=>item.id}/>;
};

export default ExpensesList;

const styles = StyleSheet.create({});
