const { PrismaClient } = require('@prisma/client');
const express = require('express');
const path = require('path');
require('dotenv').config()

const app = express();
const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/characters', async(req, res) => {
    let status = 200;
    let returnData = {};

    try {
        const data = await prisma.characters.findMany({
            include: {
                characteristics: true,
                professionalstatus: true
            }
        });
        returnData.data = data;
    } catch(e) {
        console.error(e);
        status = 500;
        returnData.message = "Something went wrong.";

    } finally {
        res.status(status).json(returnData);
    }
});

app.get('/characters/:id', async(req, res) => {
    const { id } = req.params;
    const ID = Number(id);

    const data = await prisma.characters.findUnique({
        where: {
            id: ID
        },
        include: {
            characteristics: true,
            professionalstatus: true
        }
    })
    
    if(!data) {
        return res.json({message: 'Couldn\'t find that character'});
    }

    res.json(data);
})

app.listen(3333, () => {
    console.log("App is listening.")
});