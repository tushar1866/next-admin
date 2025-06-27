import { SignUpForm } from "../components/signup-form";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="w-full flex flex-col px-6 pt-3 md:px-10 overflow-y-auto">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm h-full overflow-y-auto">
            <SignUpForm />
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/signup-poster.png"
          alt="place-image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
