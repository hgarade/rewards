import { render, screen, waitFor } from "@testing-library/react";
import HomeComponent from "./HomeComponent";
import getCustomerData from "../../utils/api";
import { transactions } from "../../constants/mockData";

jest.mock("../../utils/api");
beforeEach(() => {
  getCustomerData.mockResolvedValue(transactions);
});
test("renders loading text", () => {
  render(<HomeComponent />);
  const loadingText = screen.getByText("Data Loading....");
  expect(loadingText).toBeInTheDocument();
});

test("display customer name", async () => {
  render(<HomeComponent />);
  await waitFor(() => {
    const customerName = screen.getByText("Brooke Keller");
    expect(customerName).toBeInTheDocument();
  });
});
