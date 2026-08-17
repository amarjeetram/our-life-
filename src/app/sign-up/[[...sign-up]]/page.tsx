import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-28 pb-16 px-4 bg-slate-950/40">
      <SignUp />
    </div>
  );
}

