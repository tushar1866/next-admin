"use client";
import { SignInForm } from "./components/signin-form";

export default function SignInPage() {
  return (
    <div className="w-full h-full grid lg:grid-cols-2 overflow-hidden">
      <div className="w-full max-h-full flex flex-col items-center justify-center overflow-hidden overflow-y-auto py-6 no-scrollbar">
        <SignInForm />
      </div>
      <div className="bg-muted relative hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/signin-poster.png"
          alt="place-image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
