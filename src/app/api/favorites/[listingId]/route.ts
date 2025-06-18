import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

type Ctx = { params: Promise<{ listingId: string }> }

export async function POST(_req: Request, ctx: Ctx) {
  const currentUser = await getCurrentUser()
  if (!currentUser) return NextResponse.error()

  const { listingId } = await ctx.params
  if (!listingId) throw new Error('Invalid ID')

  const favs = new Set(currentUser.favoriteIds ?? [])
  favs.add(listingId)

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds: [...favs] },
  })

  return NextResponse.json(user)
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const currentUser = await getCurrentUser()
  if (!currentUser) return NextResponse.error()

  const { listingId } = await ctx.params
  if (!listingId) throw new Error('Invalid ID')

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoriteIds: (currentUser.favoriteIds ?? []).filter(id => id !== listingId),
    },
  })

  return NextResponse.json(user)
}
