import { View } from "react-native";
import Input from "./Input";

export default function ExpenseForm() {
  function amountChangedHandler() {}
  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: amountChangedHandler,
          autoFocus: true,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <Input label="Description" textInputConfig={{
        
      }} />
    </View>
  );
}
