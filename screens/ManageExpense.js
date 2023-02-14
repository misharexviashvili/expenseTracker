import { Text } from "react-native";
import { useLayoutEffect } from "react";

const ManageExpense = ({ navigation, route }) => {
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

  return <Text>ManageExpense</Text>;
};

export default ManageExpense;
