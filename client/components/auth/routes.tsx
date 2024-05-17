import React from "react";
import { redirect } from "next/navigation";

import { SignInForm } from "./sign-in";
import { SignUpForm } from "./sign-up";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
} from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

export const Routes = ({ route }: { route: string }) => {
  switch (route) {
    case "sign-in":
      return (
        <FormCard
          title="Login to your accound"
          description="Enter ypur email below to login your acound"
        >
          <SignInForm />
        </FormCard>
      );
    case "sign-up":
      return (
        <FormCard
          title="Create an account"
          description="Enter your email below to create your account"
        >
          <SignUpForm />
        </FormCard>
      );
    default:
      return redirect("/");
  }
};

const FormCard = ({ children, description, title }: FormCardProps) => {
  return (
    <div className="p-5">
      <Card className="w-full md:w-[28rem]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-start gap-4">
            <Image src={"/logo.svg"} alt="log" width={80} height={80} />
            <div className="flex flex-col items-start justify-start gap-2">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">{children}</CardContent>
        <CardFooter className="flex gap-4 mt-4 items-center justify-center">
          <IoLogoInstagram className="text-[22px] text-gray-500 hover:text-pink-700 cursor-pointer" />
          <IoLogoTwitter className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
          <FaLinkedinIn className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
          <IoLogoFacebook className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
          <IoLogoYoutube className="text-[22px] text-gray-500 hover:text-red-600 cursor-pointer" />
        </CardFooter>
      </Card>
    </div>
  );
};

interface FormCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
}
