const { PrismaClient } = require('@prisma/client');
const router = require('express').Router();

const { characters } = new PrismaClient();

router.get('/', async(req, res) => {
    let status = 200;
    let data = {};

    try {
        const chars = await characters.findMany({
            include: {
                characteristics: true,
                professionalstatus: true
            }
        });

        if(!chars)
            data.message = 'Couldn\'t find characters'
        else
            data.data = data;
    } catch(e) {
        console.error(e);
        status = 500;
        data.message = 'Something went wrong.';

    } finally {
        res.status(status).json(data);
    }
});


router.get('/:id', async(req, res) => {
    const { id } = req.params;

    try{
        const char = await characters.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                characteristics: true,
                professionalstatus: true
            }
        })
        
        if(!char){
            res.json({message: 'Couldn\'t find that character'});
            return;
        } else {
            res.json(data);
        }
    }catch(e) {
        console.error(e);
        res.json({message: 'Something went wrong.'});
    }
});

module.exports = router;