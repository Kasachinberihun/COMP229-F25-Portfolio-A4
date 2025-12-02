
import { render, screen } from "@testing-library/react";
import Home from "../Home.jsx";

// Mock AuthContext since Home uses useAuth()
vi.mock("../AuthContext", () => ({
  useAuth: () => ({
    user: { name: "Test User", role: "Admin" }
  })
}));

describe("Home Page", () => {
  test("renders success login message", () => {
    render(<Home />);

    const message = screen.getByText(/You are successfully logged in\./i);

    expect(message).toBeInTheDocument();
  });
});

