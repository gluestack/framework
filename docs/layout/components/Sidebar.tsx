import { useState } from "react";
import React from "react";
import Link from "next/link";

export default function Sidebar(props: any) {
  const baseDirPath = process.cwd();

  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <nav className="md:left-0 fixed md:h-full md:overflow-y-auto md:flex-row md:flex-nowrap shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-80 z-10 ">
      <div className="md:flex-col md:items-stretch overflow-hidden md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full">
        <div className="pt-4">
          {props.sidebar.map((sidebarItem: any) => {
            return (
              <div className="mt-4 ">
                <SidebarItems props={sidebarItem} version={props.version} />
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

const SidebarItems = ({ props, version }: any) => {
  return (
    <>
      <div className="">
        {props?.type == "heading" && (
          <>
            {props.isCollapsed ? (
              <HeadingDropdown props={props} version={version} />
            ) : (
              // <div className="text-black">hihihi</div>
              <>
                <h2 className="font-medium leading-tight text-lg mt-0 mb-2 text-gray-600 px-6 ">
                  {props.title}
                </h2>
                {props?.pages.map((pageInfo: any) => {
                  if (pageInfo.type == "heading") {
                    return <SidebarItems props={pageInfo} version={version} />;
                  }
                  return (
                    <Link href={"/" + version + "/" + pageInfo.id}>
                      <div className="text-gray-800 py-3 hover:bg-gray-100 hover:cursor-pointer px-6 ">
                        {pageInfo.title}
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

const HeadingDropdown = ({ props, version }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item bg-white">
        <h2 className="accordion-header " id="headingOne">
          <button
            className="relative flex items-center w-full text-gray-800 justify-between flex px-6 accordion-body py-3 hover:bg-gray-100 hover:cursor-pointer px-6  hover:bg-gray-100 text-black rounded-none transition focus:outline-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="truncate-ellipsis">{props.title}</div>
            {isOpen ? (
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-up"
                className="w-2 ml-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"
                ></path>
              </svg>
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="caret-down"
                  className="w-2 ml-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  ></path>
                </svg>
              </>
            )}
          </button>
        </h2>
        <div
          id="collapseOne"
          // className="accordion-collapse show"
          className={`${
            isOpen ? "" : "hidden"
          } bg-white accordion-collapse show `}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          {/* <div className=" py-4 bg-red.900 text-black px-5">
            hihi
          </div> */}
          {props?.pages.map((pageInfo: any) => {
            // console.log(pageInfo);
            if (pageInfo.type == "heading") {
              return <SidebarItems props={pageInfo} version={version} />;
            }
            return (
              <Link
                href={"/" + version + "/" + pageInfo.id}
                // onClick={() => handleItemClick(pageInfo)}
              >
                <div className="text-gray-800 pl-8 accordion-body py-3 hover:bg-gray-100 hover:cursor-pointer px-6">
                  {pageInfo.title}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
