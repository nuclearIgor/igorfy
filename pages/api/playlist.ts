import prisma from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";
import {NextRequest, NextResponse} from "next/server";

export default validateRoute( async (req: NextRequest, res: NextResponse, user) => {
    const playlists = await prisma.playlist.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            name: 'asc',
        }
    })

    // @ts-ignore
    res.json(playlists)
})
