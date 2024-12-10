import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App Component", () => {
  test("renders Navbar and Footer", () => {
    render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
    );

    expect(screen.getByText(/Medici App/i)).toBeInTheDocument(); // Navbar
    expect(screen.getByText(/Medici App/i)).toBeInTheDocument(); // Footer
  });

  test("renders RegisterForm on /register route", () => {
    render(
        <MemoryRouter initialEntries={["/register"]}>
          <App />
        </MemoryRouter>
    );

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test("renders LoginForm on /login route", () => {
    render(
        <MemoryRouter initialEntries={["/login"]}>
          <App />
        </MemoryRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test("renders Dashboard on / route", () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
    );

    expect(screen.getByText(/User Dashboard/i)).toBeInTheDocument();
  });
});
