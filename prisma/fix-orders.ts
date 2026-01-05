import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting migration of orders and order items...')

  try {
    // 1. Fix Orders
    // Use findRaw to get the data as it is in the DB (strings) without Prisma validation errors
    const orders = await prisma.order.findRaw({}) as unknown as any[]
    
    let ordersUpdated = 0
    
    for (const order of orders) {
      // MongoDB _id is usually returned as { $oid: "..." } in findRaw result
      const id = order._id?.$oid || order._id
      
      if (!id) continue
    
    const updates: any = {}
      let needsUpdate = false

      // Helper to clean price string (e.g., "$50.00" -> 50.00)
      const cleanPrice = (val: any) => {
        if (typeof val === 'string') {
          const cleaned = val.replace(/[^0-9.]/g, '')
          const number = parseFloat(cleaned)
          return isNaN(number) ? 0 : number
        }
        return val
      }

      if (typeof order.subtotal === 'string') {
        updates.subtotal = cleanPrice(order.subtotal)
        needsUpdate = true
      }
      if (typeof order.shipping === 'string') {
        updates.shipping = cleanPrice(order.shipping)
        needsUpdate = true
      }
      if (typeof order.total === 'string') {
        updates.total = cleanPrice(order.total)
        needsUpdate = true
      }

      if (needsUpdate) {
        await prisma.order.update({
          where: { id },
          data: updates
        })
        ordersUpdated++
      }
    }
    console.log(`Orders processed. Updated: ${ordersUpdated}`)

    // 2. Fix OrderItems
    const orderItems = await prisma.orderItem.findRaw({}) as unknown as any[]
    let itemsUpdated = 0

    for (const item of orderItems) {
      const id = item._id?.$oid || item._id
      
      if (!id) continue

      if (typeof item.price === 'string') {
        const cleaned = item.price.replace(/[^0-9.]/g, '')
        const newPrice = parseFloat(cleaned)
        const finalPrice = isNaN(newPrice) ? 0 : newPrice
        
        await prisma.orderItem.update({
          where: { id },
          data: { price: finalPrice }
        })
        itemsUpdated++
      }
    }
    console.log(`OrderItems processed. Updated: ${itemsUpdated}`)
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
