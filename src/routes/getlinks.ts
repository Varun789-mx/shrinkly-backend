import { prisma } from "../../lib/db";
import dotenv from "dotenv"
dotenv.config();
import { Router } from "express";

const router = Router();

router.get('/getlinks', async (req, res) => {
    const userId = req.userId;
    try {
        if (!userId) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        const Getlinks = await prisma.link.findMany({
            where: {
                authorId: userId,
            }, select: {
                id:true,
                timeStamp: true,
                original_url: true,
                short_url: true,
                clicks: true,
                authorId: false,
            }, take: 7, orderBy: {
                timeStamp: "asc"
            }
        })
        if (!Getlinks) {
            return res.status(400).json({
                success: false,
                message: "Error while fetching"
            })
        }
        return res.status(200).json({
            success: true,
            data: Getlinks,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting links",
        })
    }
})

export default router;