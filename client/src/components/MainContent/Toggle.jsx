import React, { useState } from "react";

function Toggle() {
  const [isExpanded, setisExpanded] = useState(false);

  function toggleMenu() {
    setisExpanded(!isExpanded);
    console.log(isExpanded);
  }

  return <i onClick={toggleMenu} className="bx bx-chevron-right  toggle"></i>;
}

export default Toggle;
