import { Fragment, useState } from "react";
import { useMediaQuery } from "@hooks/useMediaQuery";
import CelebrityCard from "@components/CelebrityCard";
import DropDown from "@components/DropDown";
import { Celebrity } from "src/types";

const dropdownOptions = ["grid", "list"];

interface GridCelebritiesProps {
  celebrities: Celebrity[] | undefined;
}

function GridCelebrities({ celebrities }: GridCelebritiesProps) {
  const [listView, setListView] = useState(dropdownOptions[0]);
  const isTablet = useMediaQuery("(min-width: 768px)");

  const changeSelect = (option: string) => setListView(option);

  return (
    <Fragment>
      <div className="flex items-center justify-between mt-6 mb-4 md:mb-8 lg:mt-9">
        <h3 className="text-2xl font-light lg:text-5xl">Previous Rulings</h3>
        {isTablet && (
          <DropDown
            options={dropdownOptions}
            listView={listView}
            onChange={changeSelect}
          />
        )}
      </div>
      <div
        className={`flex flex-nowrap overflow-x-auto md:gap-5 md:grid ${
          listView === "grid"
            ? "md:grid-cols-2 lg:grid-cols-3 md:gap-7"
            : "md:grid-cols-1"
        }`}>
        {(celebrities || []).map((celebrity) => (
          <CelebrityCard
            key={celebrity._id}
            celebrity={celebrity}
            listView={listView}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default GridCelebrities;
