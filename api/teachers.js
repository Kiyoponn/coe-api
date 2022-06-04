const { PrismaClient } = require("@prisma/client");
const router = require("express").Router();

const { characters } = new PrismaClient();

router.get("/", async (req, res) => {
    let status = 200;
    let data = {};

    try {
        const getTeachers = await characters.findMany({
            where: {
                professionalstatus: {
                    is: {
                        occupation: {
                            in: ["Teacher"],
                        },
                    },
                },
            },
            include: {
                characteristics: true,
                professionalstatus: true,
            },
        });

        if (!getTeachers) data.message = "Coudn't find any teacher data";
        else data.teachers = getTeachers;
    } catch (e) {
        console.error(e);
        status = 500;
        data.message = "Something went wrong";
    } finally {
        res.status(status).json(data);
    }
});

module.exports = router;
