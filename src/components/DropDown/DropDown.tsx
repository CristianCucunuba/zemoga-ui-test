import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface DropDownProps {
  options: string[];
  listView: string;
  onChange: (option: string) => void;
}

function DropDown({ listView, onChange, options }: DropDownProps) {
  return (
    <div className="z-10 w-36 h-7">
      <Listbox value={listView} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full py-1 border-2 border-black focus:outline-none">
            <span className="text-sm text-center capitalize">{listView}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="7"
                fill="none">
                <path
                  fill="#333"
                  fillRule="evenodd"
                  d="M5.25 7L0 0h10.5L5.25 7z"
                  clipRule="evenodd"></path>
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute w-full bg-white focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  className="relative py-2 text-sm text-center capitalize border-2 border-t-0 border-black focus:outline-none"
                  value={option}>
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default DropDown;
