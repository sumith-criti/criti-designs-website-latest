import { prisma } from './prisma'

export async function logActivity(
  userId: string,
  action: string,
  description?: string,
  invoiceId?: string,
  metadata?: Record<string, any>
) {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        invoiceId: invoiceId || null,
        action,
        description: description || null,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    })
  } catch (error) {
    console.error('Failed to log activity:', error)
    // Don't throw - activity logging should not break the main flow
  }
}

