"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signUpSchema } from "@/schema/auth";
import { useSignUp } from "@/query/auth/api/use-signup";
import { useSignIn } from "@/query/auth/api/use-signin";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
} from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";

export default function AuthPage() {
  const params = useSearchParams();

  const url = params.get("callbackUrl");

  const callbackUrl = url ? decodeURIComponent(url) : "/dashboard";

  const signupMutation = useSignUp();
  const signinMutation = useSignIn(callbackUrl);

  const signinForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = (values: z.infer<typeof signInSchema>) => {
    signinMutation.mutate(values);
  };

  const signupForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = (values: z.infer<typeof signUpSchema>) => {
    signupMutation.mutate(values);
  };

  return (
    <Tabs defaultValue="signin" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">SignIn</TabsTrigger>
        <TabsTrigger value="signup">SignUp</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...signinForm}>
              <form
                onSubmit={signinForm.handleSubmit(handleSignin)}
                className="space-y-6"
              >
                <FormField
                  control={signinForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="email"
                          {...field}
                          className="rounded-sm w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signinForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="password"
                          type="password"
                          {...field}
                          className="rounded-sm w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={signinMutation.isPending}
                >
                  {signinMutation.isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner size={"lg"} />
                      <span>SignIn</span>
                    </div>
                  ) : (
                    "SignIn"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex gap-4 mt-4 items-center justify-center">
            <IoLogoInstagram className="text-[22px] text-gray-500 hover:text-pink-700 cursor-pointer" />
            <IoLogoTwitter className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <FaLinkedinIn className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <IoLogoFacebook className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <IoLogoYoutube className="text-[22px] text-gray-500 hover:text-red-600 cursor-pointer" />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...signupForm}>
              <form
                onSubmit={signupForm.handleSubmit(handleSignup)}
                className="space-y-6"
              >
                <FormField
                  control={signupForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="username"
                          {...field}
                          className="rounded-sm w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="email"
                          {...field}
                          className="rounded-sm w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="password"
                          type="password"
                          {...field}
                          className="rounded-sm w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={signupMutation.isPending}
                >
                  {signupMutation.isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner size={"lg"} />
                      <span>SignUp</span>
                    </div>
                  ) : (
                    "SignUp"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex gap-4 mt-4 items-center justify-center">
            <IoLogoInstagram className="text-[22px] text-gray-500 hover:text-pink-700 cursor-pointer" />
            <IoLogoTwitter className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <FaLinkedinIn className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <IoLogoFacebook className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <IoLogoYoutube className="text-[22px] text-gray-500 hover:text-red-600 cursor-pointer" />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
