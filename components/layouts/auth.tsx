"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logIn } from "@/redux/features/auth-slice";
import dynamic from "next/dynamic";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { User } from "@/interfaces/user";
import NotifiOption from "@/components/notifioption";
import { NextUIProvider } from "@nextui-org/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../locales/i18n";

const Header = dynamic(() => import("../header"), { ssr: false });
const Footer = dynamic(() => import("../footer"), { ssr: false });

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const pathname = usePathname();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const accessTokenWeb: any = await getCookie("access_token");
      const decoded: User = jwtDecode(accessTokenWeb);
      dispatch(logIn(decoded));
    } catch (error: any) {
      console.log("error", error);
      router.push("/login");
    }
  };

  return (
    <div>
      <body>
        <header className="z-50 sticky top-0 w-full">
          {pathname !== "/login" && <Header />}
        </header>
        <I18nextProvider i18n={i18n}>
          <main className="overflow-y-auto"> {children}</main>
        </I18nextProvider>
        <NextUIProvider>
          <NotifiOption />
        </NextUIProvider>

        <footer>{pathname !== "/login" && <Footer />}</footer>
      </body>
    </div>
  );
}
