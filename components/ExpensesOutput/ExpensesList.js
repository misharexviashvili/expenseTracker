import { FlatList, StyleSheet, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";
// Function for rendering, instead of passing function directly int oflatlis renderItem
function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}
const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
