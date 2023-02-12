import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
function ExpensesOverview(){
  return(
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses}/>
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses}/>
    </BottomTabs.Navigator>
  )
}
export default function App() {
  return (
    <Fragment>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview}/>
          <Stack.Screen name="ManageExpense" component={ManageExpense}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}
