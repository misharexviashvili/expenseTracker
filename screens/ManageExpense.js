import { StyleSheet, TextInput, View } from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconbButton from "../components/UI/IconbButton";
import GlobalStyles from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpense = ({ navigation, route }) => {
  const expensesCtx = useContext(ExpensesContext);
  // params must be checked with ? because if its undefined drilling it will cause error
  const editedEpxenseId = route.params?.expenseId;
  // CONVERTING INTO BOOLEAN USING !! symbol, it converts truthy value into true, falsy  into false
  const isEditing = !!editedEpxenseId;
  // We should call  navigation.setOptions() from inside useEffect or useLayoutEffect, useLayoutEffect renders while screen is laoded, useEffect waits and loads after
  useLayoutEffect(() => {
    navigation.setOptions(
      {
        title: isEditing ? "Edit expense" : "Add Expense",
      },
      [navigation, isEditing]
    );
  });
  // TODO:
  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedEpxenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(editedEpxenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "UPDATE" : "ADD"}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconbButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
