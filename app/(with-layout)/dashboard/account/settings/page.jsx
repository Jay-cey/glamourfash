import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { ConnectedAccounts } from "@/components/auth/ConnectedAccounts"
import SettingsClient from "./settings-client"

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user?.id) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-stone-500 font-serif">Please log in to view settings</p>
      </div>
    )
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      hashedPassword: true,
      accounts: { select: { provider: true } },
    },
  })

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-stone-500 font-serif">User not found</p>
      </div>
    )
  }

  const linkedProviders = user.accounts.map((a) => a.provider)
  const hasPassword = !!user.hashedPassword

  return (
    <SettingsClient>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif text-stone-900 mb-2">Account Settings</h1>
        <p className="text-stone-500 text-sm">Manage your security and connected experiences</p>
      </div>

      <section className="space-y-6">
        <div className="bg-stone-50/50 rounded-xl p-6 border border-stone-100">
          <h2 className="text-lg font-medium text-stone-800 mb-4">Connected Accounts</h2>
        <ConnectedAccounts
          userId={session.user.id}
          initialProviders={linkedProviders}
          hasPassword={hasPassword}
        />
        </div>
      </section>
    </SettingsClient>
  )
}
