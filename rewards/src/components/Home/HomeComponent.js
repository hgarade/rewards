import React, { useEffect, useState } from "react";
import getCustomerData from "../../utils/api";
import { getCustomerDataWithCalculatedPoints } from "../../utils/calculatePoints";

const HomeComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    // fetch API userData
    getCustomerData()
      .then((transaction) => {
        const calculatedData = getCustomerDataWithCalculatedPoints(transaction); // get calculated points
        setCustomerData(calculatedData); //set it in state variable
        setIsLoading(false);
        setIsError(null);
      })
      .catch((error) => {
        // catch error is userData loading failed
        setIsLoading(false);
        setIsError(error);
      });
  }, []);

  return (
    <>
      <h1 className="flex justify-center m-4">Rewards Points Earned</h1>
      <div className="flex justify-center m-4 p-4">
        {/* to show loading message */}
        {isLoading && <div>Data Loading....</div>}

        {/* to show error message */}
        {isError && <div>Data failed to load. Please try again...!!</div>}

        {/* show table only if customer userData is available */}
        {customerData && (
          <table className="table-auto">
            <thead>
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Monthly Amount Spent</th>
                <th className="p-4">Total Amount Spent</th>
                <th className="p-4">Monthly Points</th>
                <th className="p-4">Total Points</th>
                
              </tr>
            </thead>
            <tbody className="text-center">
              {/* iterate over object for each customer */}
              {Object.entries(customerData).map(([userId, userData]) => (
                <tr key={userId}>
                  <td className="p-4">{userId}</td>
                  <td className="p-4">{userData.userName}</td>
                  <td className="p-4"><ul>
                      {/* iterate over monthly amount object for each month */}
                      {Object.entries(userData.monthlyAmount).sort((a,b)=>a[0]-b[0]).map(
                        ([month, amount]) => (
                          <li key={month}>
                            Month {new Date(month).toLocaleString("default", { month: "long" })} :- {amount}
                          </li>
                        )
                      )}{" "}
                    </ul></td>
                  <td className="p-4">{userData.totalAmount}</td>
                  <td className="p-4">
                    <ul>
                      {/* iterate over monthly points object for each month */}
                      {Object.entries(userData.monthlyPoints).sort((a,b)=>a[0]-b[0]).map(
                        ([month, points]) => (
                          <li key={month}>
                            Month {new Date(month).toLocaleString("default", { month: "long" })} :- {points}
                          </li>
                        )
                      )}{" "}
                    </ul>
                  </td>
                  
                  <td className="p-4">{userData.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default HomeComponent;
