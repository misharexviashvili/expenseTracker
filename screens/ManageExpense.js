import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import IconbButton from "../components/UI/IconbButton";
import GlobalStyles from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ navigation, route }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  // params must be checked with ? because if its undefined drilling it will cause error
  const editedEpxenseId = route.params?.expenseId;
  // CONVERTING INTO BOOLEAN USING !! symbol, it converts truthy value into true, falsy  into false
  const isEditing = !!editedEpxenseId;
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedEpxenseId
  );
  // We should call  navigation.setOptions() from inside useEffect or useLayoutEffect, useLayoutEffect renders while screen is laoded, useEffect waits and loads after
  useLayoutEffect(() => {
    navigation.setOptions(
      {
        title: isEditing ? "Edit expense" : "Add Expense",
      },
      [navigation, isEditing]
    );
  });
  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedEpxenseId);
      expensesCtx.deleteExpense(editedEpxenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense, please try again later");
      setIsSubmitting(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedEpxenseId, expenseData);
        await updateExpense(editedEpxenseId, expenseData);
        setIsSubmitting(false);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
        setIsSubmitting(false);
        navigation.goBack();
      }
    } catch (error) {
      setError("Could not save data, please try again later");
      setIsSubmitting(false);
    }
  }
  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "UPDATE" : "ADD"}
        defaultValues={selectedExpense}
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
