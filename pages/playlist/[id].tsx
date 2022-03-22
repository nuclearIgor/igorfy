import prisma from "../../lib/prisma";
import {validateToken} from "../../lib/auth";

const PLaylist = ({ playlist }) => {
    return (
        <>
            <div>{playlist.id}</div>
            <div>{playlist.name}</div>
        </>
    )
}

export const getServerSideProps = async ({ query, req }) => {
    const { id } = validateToken(req.cookies.IGORFY_ACCESS_TOKEN)
    const [playlist] = await prisma.playlist.findMany({
        where: {
            id: +query.id,
            userId: id,
        },
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true,
                        }
                    }
                }
            }
        }
    })

    return {
        props: { playlist },
    }

}

export default PLaylist
