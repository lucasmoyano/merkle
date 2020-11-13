import React, { useEffect, useRef } from 'react';

interface Props {
  children?: any;
  loadMore: any;
  loader: any;
  hasMore: boolean;
}

const InfiniteScroll: React.FC<Props> = (props: Props) => {

  const preload = useRef<any>(null);

  useEffect(() => {
    handleScroll();


    preload.current.addEventListener("scroll", handleScroll);
    preload.current.addEventListener("touchmove", handleScroll);
    return () => {
      preload.current.removeEventListener("scroll", handleScroll)
      preload.current.removeEventListener("touchmove", handleScroll)
    };
  }, []);

  const handleScroll = () => {
    alert("SCROL")
    if (isInViewport(preload.current, 500)) {
      loadMore();
    }
  }

  const isInViewport = (el: any, offset = 0) => {
    debugger;
    if (!el) { return; }
    const top = el.getBoundingClientRect().top;
    return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
  }

  const loadMore = () => {
    props.loadMore();
  }


  return <>
    {props.children}
    {props.hasMore &&
      <div ref={preload} onClick={handleScroll}>
        {props.loader}
      </div>
    }
  </>;
};

export default InfiniteScroll;
