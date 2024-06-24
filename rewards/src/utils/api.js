import { transactions } from "../constants/mockData";

/**
 * Mocking the API call by resolving promise after 2 sec.
 * @returns transaction data of customers
 */
const getCustomerData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(transactions);
      //reject("Data Loading Failed")    // uncomment to mock the failed scenario
    }, 2000);
  });
};

export default getCustomerData;
