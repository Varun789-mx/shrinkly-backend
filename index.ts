import express from "express";
import dotenv from "dotenv"
import { prisma } from "./lib/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.get("/:code", async (req, res) => {
    const code = req.params.code;
    try {
        const origial_url = prisma.Url.findUnique({
            where:{
                short_url:code,
            }
        })


    }
})
