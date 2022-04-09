import prisma from "../../lib/prisma";
import {validateToken} from "../../lib/auth";
import GradientLayout from "../../components/gradientLayout";
import SongsTable from "../../components/songsTable";

const getBGColor = id => {
    const colors = [
        'red',
        'green',
        'blue',
        'yellow',
        'orange',
        'purple',
        'gray',
        'teal',
    ]

    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const PLaylist = ({ playlist }) => {
    const color = getBGColor(playlist.id)

    return (
        <>
            <GradientLayout color={color} roundImage={false} title={playlist.name} subtitle="playlist"
            description={`${playlist.songs.length} songs`} image="https://picsum.photos/200"
            >
                <SongsTable songs={playlist.songs}/>
            </GradientLayout>
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
