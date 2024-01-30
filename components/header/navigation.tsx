"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import styles from "./styles.module.css";
import { logOut } from "@/redux/features/auth-slice";
import { Navbar } from "flowbite-react";
import avatar from "@/public/avatar.png";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "cookies-next";
import { logIn } from "@/redux/features/auth-slice";
import { useEffect } from "react";
import { User } from "@/interfaces/user";
import SelectLanguage from "@/components/selectLanguage/index";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const Navigation = () => {
  const user = useAppSelector((state) => state.authReducer.value);

  const [open, setOpen] = useState(false);

  const [navLinks] = useState([
    {
      label: "I18n",
      url: "/product",
      role: "User",
    },
    {
      label: "Slider",
      url: "/contact",
      role: "User",
    },
    {
      label: "Seo",
      url: "/about",
      role: "User",
    },
    {
      label: "Export",
      url: "/export",
      role: "User",
    },
  ]);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const pathname = usePathname();

  const reloadPage = () => {
    const accessTokenWeb: any = getCookie("access_token");
    const decoded: User = jwtDecode(accessTokenWeb);
    dispatch(logIn(decoded));
  };

  const logout = () => {
    router.push("/login");
    dispatch(logOut());
    deleteCookie("access_token");
  };

  useEffect(() => {
    reloadPage();
  }, []);

  const openMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="bg-[#F1F5F9] text-gray-100 py-3.5 px-6 md:flex justify-between items-center shadow">
      <Link href="/home" className="md:!flex items-center !hidden">
        <span className="text-[#8cdf93] text-2xl mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 2v1h12V2h2v1h1v2h-.78l.6 3H22v2h-1v10h1v2H2v-2h1V10H2V8h1.18l.6-3H3V3h1V2h2Zm-.18 3l-.6 3h13.56l-.6-3H5.82ZM19 10h-3v10h3V10Zm-5 10V10h-4v10h4Zm-6 0V10H5v10h3Z"
            />
          </svg>
        </span>
        <h1 className="text-xl text-[#8cdf93]">HomePage</h1>
      </Link>

      <span
        className="absolute md:hidden left-6 top-6 cursor-pointer text-4xl"
        onClick={() => openMenu()}
      >
        {!open && (
          <div className="text-[green]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M17 3v4m0 3v4m0 3v4m4-17v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1zm0 7v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1zm0 7v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1z"
              />
            </svg>
          </div>
        )}
        {open && (
          <div className="text-[green]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="m3 3l18 18M3 21L21 3"
              />
            </svg>
          </div>
        )}
      </span>
      <div className="flex row items-center justify-end md:justify-center gap-10 ">
        <ul
          className={`bg-[#F1F5F9] md:flex md:items-center md:px-0 px-10 md:pb-0 pb-10 md:static absolute md:w-auto w-full top-14 duration-500 ease-in z-50 h-[100vh] md:h-[0] ${
            open ? "left-0" : "left-full"
          }`}
        >
          {navLinks &&
            navLinks.map((link, _) => {
              const isActive = pathname === link.url;
              return (
                <li className="md:px-4 md:my-0 text-[20px]" key={link.url}>
                  <Link
                    className={`block py-4 transition ease-in duration-300 ${
                      isActive
                        ? `text-[#8bd84c] sm:text-[#83ec8c] !max-md:text-white border-b-2 border-[#8cdf93]`
                        : `text-[#6B7280] max-md:text-[#6B7280] max-md:bg-gray-100 border-b-2 border-[#F1F5F9]`
                    }`}
                    href={`${link.url}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
        </ul>

        <div className="text-[green]">
          <SelectLanguage />
        </div>

        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">
                <div className="w-[40px] md:w-[50px] h-[40px] md:h-[50px]">
                  <Image
                    src={user.user?.picture || avatar}
                    alt="avatar-user"
                    width="100"
                    height="100"
                    className="rounded-full outline-none"
                  />
                </div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              className="bg-[#edf1ed] p-6 rounded-md shadow-md"
            >
              <DropdownItem
                className="hover:bg-[#aad6aa] px-3 py-1 cursor-pointer rounded-md "
                key="new"
              >
                Profile
              </DropdownItem>
              <DropdownItem
                className="hover:bg-[#aad6aa] px-3 py-1 cursor-pointer rounded-md "
                key="copy"
              >
                Product management
              </DropdownItem>
              <DropdownItem
                className="hover:bg-[#aad6aa] px-3 py-1 cursor-pointer rounded-md "
                key="edit"
                onClick={() => logout()}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
