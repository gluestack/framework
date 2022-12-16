import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Navbar(props: any) {
  const [isOpen, setOpen] = useState(false);
  console.log(props);
  const getVersions = () => {
    let arr = [];
    let versionsInfo = props.versionsData;
    for (let i = 0; i < versionsInfo.length; i++) {
      arr.push(Object.keys(versionsInfo[i])[0]);
    }
    return arr;
  };
  const router = useRouter();
  const [versions, setVerrions] = useState(getVersions());

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  const handleClick = (version: any) => {
    console.log(version);
    props.setVersion(version);
    setOpen(false);
    router.push("/" + version);
  };
  return (
    <>
      {/* Navbar */}
      <nav className=" top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center border-b-2">
        <div className=" mx-auto w-full py-4 bg-white">
          <div className=" mx-auto px-5 flex items-center justify-between">
            <div className="">
              <Link href="/" passHref legacyBehavior>
                <a className="inline-flex items-center">
                  <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-red-600 text-center font-bold bg-white ring-1 ring-red-600 ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                    GlueStack
                  </span>
                </a>
              </Link>
            </div>

            <div>
              <button
                id="dropdownDividerButton"
                data-dropdown-toggle="dropdownDivider"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={handleDropDown}
              >
                {props.version}
                <svg
                  className="ml-2 w-4 h-4"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              <div
                id="dropdown"
                className={`${
                  isOpen ? "" : "hidden"
                }  z-10 absolute bg-white  w-44 rounded shadow dark:border-2 border-blue-100 `}
              >
                <ul
                  className="py-1 text-sm text-gray-700"
                  aria-labelledby="dropdownDefault"
                >
                  {versions.map((version, index) => {
                    return (
                      <li className="py-1 text-sm text-gray-700" key={index}>
                        <button
                          onClick={() => handleClick(version)}
                          // className="block py-2 px-4 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          className="block py-2 px-4"
                        >
                          {version}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
