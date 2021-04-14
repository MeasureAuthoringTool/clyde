import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";

test("renders app home", () => {
    render(<App/>);
    const appName = screen.getByText(/MADiE/i);
    expect(appName).toBeInTheDocument();
});
