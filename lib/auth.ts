import {NextApiRequest, NextApiResponse} from "next";
import jwt from 'jsonwebtoken'
import prisma from "./prisma";

export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.cookies.IGORFY_ACCESS_TOKEN
        // const { IGORFY_ACCESS_TOKEN: token } = req.cookies

        if(token){
            let user

            try {
                const {id} = jwt.verify(token, 'hello')
                user = await prisma.user.findUnique({
                    where: {id},
                })

                if(!user){
                    throw new Error('not an user')
                }
            }
            catch (e) {
                res.status(401)
                res.json({error: 'not authorized'})
                return;
            }

            return handler(req, res, user)
        }
        res.status(401)
        res.json({error: 'not authorized'})
    }
}

export const validateToken = token => {
    const user = jwt.verify(token, 'hello')
    return user
}
