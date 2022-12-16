import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Content } from "./components/Content";

function Layout(props: any) {
  return (
    <div className="relative h-[100vh] overflow-hidden">
      <Navbar
        setVersion={props.setVersion}
        version={props.version}
        versionsData={props.versionsData}
      />
      <div className="h-full w-full flex row ">
        <Sidebar
          {...props.versionInfo[props.version]}
          version={props.version}
        />
        <Content {...props} />
      </div>
    </div>
  );
}

export default Layout;
