import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AccountView from "./account-view";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return <AccountView user={session.user} />;
}