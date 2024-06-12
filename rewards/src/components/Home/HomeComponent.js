import React, { useEffect, useState } from "react";
import getCustomerData from "../../utils/api";
import { getCustomerDataWithCalculatedPoints } from "../../utils/calculatePoints";

const HomeComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    // fetch API data
    getCustomerData()
      .then((entry) => {
        const calculateData = getCustomerDataWithCalculatedPoints(entry); // get calculated points
        setCustomerData(calculateData); //set it in state variable
        setIsLoading(false);
        setIsError(null);
      })
      .catch((error) => {
        // catch error is data loading failed
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

        {/* show table only if customer data is available */}
        {customerData && (
          <table className="table-auto">
            <thead>
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Total Amount Spent</th>
                <th className="p-4">Total Points</th>
                <th className="p-4">Monthly Points</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* iterate over object for each customer */}
              {Object.entries(customerData).map(([id, data]) => (
                <tr key={id}>
                  <td className="p-4">{id}</td>
                  <td className="p-4">{data.name}</td>
                  <td className="p-4">{data.totalAmount}</td>
                  <td className="p-4">{data.totalPoints}</td>
                  <td className="p-4">
                    <ul>
                      {/* iterate over monthly points object for each month */}
                      {Object.entries(data.monthlyPoints).map(
                        ([month, points]) => (
                          <li key={month}>
                            Month {month} :- {points}
                          </li>
                        )
                      )}{" "}
                    </ul>
                  </td>
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
