import axios from "axios";

const BACKEND_URL =
  "https://react-native-expensetrac-dd1ba-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  //  Firebase instead of id property has name property
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  //   console.log(response.data);
  const expenses = [];
  //  data comes from axios, thats why it is not declared anywhere in the code
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      //   Firebase stores date as string, that's why we have to use new Date()
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  //   Array of objects
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}
export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
