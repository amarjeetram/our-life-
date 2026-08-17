import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-28 pb-16 px-4 bg-slate-950/40">
      <SignIn />
    </div>
  );
}

