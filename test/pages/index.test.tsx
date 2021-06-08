import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../../src/pages";
import { MockQueryProvider, addMathMediaToDOM } from "../test.utils";
import { celebrities } from "../mockData";

jest.mock("src/api", () => ({}));
jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

afterEach(() => {
  jest.clearAllMocks();
});

it("Render Home page correctly", async () => {
  addMathMediaToDOM();

  const { getByText } = render(
    <MockQueryProvider>
      <Home celebrities={celebrities} />
    </MockQueryProvider>
  );

  expect(getByText("Rule of thumb.")).toBeInTheDocument();
  expect(getByText("Kanye West")).toBeInTheDocument();
});
