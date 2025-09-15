import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { ConnectedAccounts } from "@/components/auth/ConnectedAccounts"

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user?.id) {
    return <p>Please log in</p>
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      hashedPassword: true,
      accounts: { select: { provider: true } },
    },
  })

  if (!user) {
    return <p>User not found</p>
  }

  const linkedProviders = user.accounts.map((a) => a.provider)
  const hasPassword = !!user.hashedPassword

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Connected Accounts</h2>
        <ConnectedAccounts
          userId={session.user.id}
          initialProviders={linkedProviders}
          hasPassword={hasPassword}
        />
      </section>
    </div>
  )
}
