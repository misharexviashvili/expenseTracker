import { StyleSheet, Text, View } from "react-native";
// Expenses prop comes from ExpensesOutput, which has DUMMY_EXPENSES data for now
const ExpensesSummary = ({ expenses, periodName }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    // TODO: expense obj must have amount prop later on
    return sum + expense.amount;
  }, 0);
  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({});
