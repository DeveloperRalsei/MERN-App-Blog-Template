import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingBarRef } from "react-top-loading-bar";

const usePageLoading = () => {
  const location = useLocation()
  const ref = useRef<LoadingBarRef>(null)
  const [isFirstLoad, setisFirstLoad] = useState<boolean>(true)

  useEffect(() => {
    if(isFirstLoad){
      setisFirstLoad(false)
      return
    }

    if(ref.current){
      ref.current.continuousStart()
    }
    return () => {
      if(ref.current){
        ref.current.complete()
      }
    };
  }, [location]);

  return ref
}

export default usePageLoading