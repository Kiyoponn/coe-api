const { PrismaClient } = require("@prisma/client");
const router = require("express").Router();

const { characters } = new PrismaClient();

router.get("/", async (req, res) => {
    let status = 200;
    let data = {};

    try {
        const getCharacters = await characters.findMany({
            include: {
                characteristics: true,
                professionalstatus: true,
            },
        });

        if (!getCharacters) data.message = "Couldn't find characters";
        else data.characters = getCharacters;
    } catch (e) {
        console.error(e);
        status = 500;
        data.message = "Something went wrong.";
    } finally {
        res.status(status).json(data);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const getCharacter = await characters.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                characteristics: true,
                professionalstatus: true,
            },
        });

        if (!getCharacter) {
            res.json({ message: "Couldn't find that character" });
            return;
        } else {
            res.json(getCharacter);
        }
    } catch (e) {
        console.error(e);
        res.json({ message: "Something went wrong." });
    }
});

module.exports = router;
