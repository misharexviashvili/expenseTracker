import { StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../../constants/styles";
// Expenses prop comes from ExpensesOutput, which has DUMMY_EXPENSES data for now
const ExpensesSummary = ({ expenses, periodName }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    // TODO: expense obj must have amount prop later on
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
