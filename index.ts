import express from "express";
import dotenv from "dotenv"
import { prisma } from "./lib/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.get("/:code", async (req, res) => {
    const code = req.params.code;
    try {
        const result = await prisma.link.findFirst({
            where: {
                short_url: code
            }, select: {
                original_url: true,
            }
        })
        if (!result) {
            return res.status(404).json({
                error: "Not-found",
            })

        }
        console.log(result);
        if (result?.original_url) {
            await prisma.link.updateMany({
                where: {
                    original_url: result.original_url
                },
                data: {
                    clicks: {
                        increment: 1
                    }
                }
            })
            // res.redirect(result?.original_url);
            return res.status(200).json({
                original_url: result.original_url
            })
        }

    }
    catch (error) {
        console.log("Error occured while fetching", error);
        return res.status(500).json({
            Error: error
        })
    }
})

app.post("/create",async(req,res)=> { 
    const Data = await req.body();
    if(!Data.original_url || )
})


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${[port]}/`)
})