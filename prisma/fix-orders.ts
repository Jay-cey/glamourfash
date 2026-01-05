import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting migration of orders and order items...')

  try {
    // Update Order collection
    // Convert subtotal, shipping, total from String (with potential '$') to Float
    const orderUpdate = await prisma.$runCommandRaw({
      update: "Order",
      updates: [
        {
          q: { 
            $or: [
              { subtotal: { $type: "string" } },
              { shipping: { $type: "string" } },
              { total: { $type: "string" } }
            ]
          },
          u: [
            {
              $set: {
                subtotal: { 
                  $cond: {
                    if: { $eq: [{ $type: "$subtotal" }, "string"] },
                    then: { $toDouble: { $trim: { input: "$subtotal", chars: "$" } } },
                    else: "$subtotal"
                  }
                },
                shipping: { 
                  $cond: {
                    if: { $eq: [{ $type: "$shipping" }, "string"] },
                    then: { $toDouble: { $trim: { input: "$shipping", chars: "$" } } },
                    else: "$shipping"
                  }
                },
                total: { 
                  $cond: {
                    if: { $eq: [{ $type: "$total" }, "string"] },
                    then: { $toDouble: { $trim: { input: "$total", chars: "$" } } },
                    else:"$total"
                  }
                }
              }
            }
          ],
          multi:true

        }
      ]
    })

    console.log('Orders updated:', orderUpdate)

    // Update OrderItem collection
    // Convert price from String to Float
    const orderItemUpdate = await prisma.$runCommandRaw({
      update: "OrderItem",
      updates: [
        {
          q: { price: { $type: "string" } },
          u: [
            {
              $set: {
                price: { $toDouble: { $trim: { input: "$price", chars: "$"} } }
              }
            }
          ],
          multi: true
        }
      ]
    })
    console.log('OrderItems updated:', orderItemUpdate)

  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
