const { PrismaClient } = require('@prisma/client');
const router = require('express').Router();

const { characters } = new PrismaClient();

router.get('/', async(req, res) => {
    let status = 200;
    let data = {};

    try {
        const getStudents = await characters.findMany({
            where: {
                professionalstatus: {
                    is: {
                        occupation: {
                            in: ['Student']
                        }
                    }
                }
            },
            include: {
                characteristics: true,
                professionalstatus: true
            }
        });

        if(!getStudents)
            data.message = 'Coudn\'t find any teacher data';
        else
            data.students = getStudents;

    } catch(e) {
        console.error(e);
        status = 500;
        data.message = 'Something went wrong';

    } finally {
        res.status(status).json(data);
    }
});

module.exports = router;