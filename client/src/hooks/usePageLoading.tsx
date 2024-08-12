import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingBarRef } from "react-top-loading-bar";

const usePageLoading = () => {
  const location = useLocation()
  const ref = useRef<LoadingBarRef>(null)

  useEffect(() => {

    if(ref.current){
      ref.current.continuousStart()
    }

    const timeoutID = setTimeout(() => {
      if (ref.current) ref.current.complete()
    }, 100)

    return () => clearTimeout(timeoutID)
  }, [location]);

  return ref

}

export default usePageLoading