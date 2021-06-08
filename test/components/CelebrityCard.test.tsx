import React from "react";
import { render } from "@testing-library/react";
import CelebrityCard from "@components/CelebrityCard";
import { celebrities } from "../mockData";
import { MockQueryProvider } from "../test.utils";

jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

it("Should render celebrity card for Malala Yousafzai", () => {
  const { getByText } = render(
    <MockQueryProvider>
      <CelebrityCard celebrity={celebrities[3]} listView="grid" />
    </MockQueryProvider>
  );

  expect(getByText("Malala Yousafzai")).toBeInTheDocument();
});
