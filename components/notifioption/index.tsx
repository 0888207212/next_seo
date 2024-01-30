import style from "./style.module.css";
import { useEffect, useState } from "react";
import SlideBarTabs from "../tabs";
import { usePathname } from "next/navigation";

const NotifiOption = () => {
  const [openSlideBar, setOpenSlideBar] = useState(false);

  const pathname = usePathname();

  const closeSideBar = () => {
    setOpenSlideBar(false);
    document.body.style.overflow = "visible";
  };

  const toggleSlideBar = () => {
    setOpenSlideBar(!openSlideBar);
    document.body.style.overflow = "hidden";
  };
  return (
    <>
      {openSlideBar && (
        <div
          className=" bg-[#737470] opacity-40 fixed bottom-0 left-0 h-full w-full z-[99]"
          onClick={() => closeSideBar()}
        ></div>
      )}

      <div
        className={`bg-[#e2e7dd] shadow-lg w-[500px] fixed top-0 right-0 h-[100vh] z-[99999] transition duration-300 ease-in-out ${
          openSlideBar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SlideBarTabs />
      </div>

      {pathname !== "/login" && (
        <div
          className={`w-16 h-16 fixed right-16 bottom-[150px] flex shadow-md items-center justify-center rounded-[50%] bg-[#93f093] cursor-pointer animate-bounce hidden`}
          onClick={() => toggleSlideBar()}
        >
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75`}
          ></span>
          <span className="h-6 w-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 0 448 512"
              className="relative flex h-6 w-6 "
              fill="green"
            >
              <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
            </svg>
          </span>
        </div>
      )}
    </>
  );
};

export default NotifiOption;
