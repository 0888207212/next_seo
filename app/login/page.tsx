"use client";

import Image from "next/image";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logIn } from "@/redux/features/auth-slice";
import { User } from "@/interfaces/user";
import { setCookie } from "cookies-next";
import { showToastMessage } from "@/utils/helper/Toast";

const LoginUserPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLoginBtn = async (accessToken: any) => {
    showToastMessage("Đăng nhập thành công", "success");
    setCookie("access_token", accessToken?.credential, {
      maxAge: 60 * 60 * 24 * 10,
    });
    const decoded: User = jwtDecode(accessToken?.credential);
    dispatch(logIn(decoded));
    return router.push("/home");
  };

  const handleLogin = async (accessToken: string) => {
    console.log(222, accessToken);
    setCookie("accessToken", accessToken);
  };

  const onHandleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      handleLogin(credentialResponse.access_token);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return (
    <div className="flex justify-center bg-white h-screen mx-auto">
      <div className="absolute top-[30%] px-16 py-10 h-[350px] w-[400px] text-center bg-white border">
        <Image
          src="/vmo-logo.png"
          alt="logo-vmo"
          width="200"
          height="100"
          className="mx-auto mb-5"
        />
        <div className="font-semibold">Đăng nhập để checkin</div>
        <div className="w-[100px] h-[100px] mx-auto mt-5">
          <Image
            src="/icon-google.svg"
            alt="icon-google"
            width="90"
            height="90"
            className="mx-auto cursor-pointer hover:w-[100px] hover:h-[100px] text-red-700"
            onClick={() => onHandleLogin()}
          />
        </div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleLoginBtn(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};
export default LoginUserPage;
