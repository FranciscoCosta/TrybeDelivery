import { Audio } from "react-loader-spinner";
import React from "react";
import "./Loading.scss";


function Loading() {
  return (
    <div className="Loading">
         <Audio
          height="100%"
          width="50%"
          radius="9"
          color="#FFD523"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
    </div>
  )
}

export default Loading;