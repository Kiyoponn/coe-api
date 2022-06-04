const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
    getCharacterPage,
    getCharacterInfo,
    // getCharacteristicsInfo,
    // getProfessionalInfo,
} = require("./data");

const insertCharacters = async () => {
    const characterNames = await getCharacterPage();
    for (let i = 0; i < characterNames.length; i++) {
        if (characterNames[i].substring(0, 8) == "Category") {
            characterNames[i] = characterNames.pop();
        }
    }

    const characterInfoPromises = characterNames.map((characterName) =>
        getCharacterInfo(characterName)
    );

    const characters = await Promise.all(characterInfoPromises);

    await prisma.characters.createMany({
        data: characters,
    });
    console.log("\nadded character data");
};

// const insertCharacteristics = async () => {
//   await prisma.characteristics.createMany({
//     data: characteristics,
//   });
//   console.log("added characteristics data");
// };

// const insertProfessionalstatus = async () => {
//   await prisma.professionalstatus.createMany({
//     data: professionalstatus,
//   });
//   console.log("added professional status data");
// };

const load = async (characters) => {
    try {
        // ! delete records if exist
        await prisma.characteristics.deleteMany();
        console.log("\ndeleted records in characteristics table");

        await prisma.professionalstatus.deleteMany();
        console.log("deleted records in professional status table");

        await prisma.characters.deleteMany();
        console.log("deleted records in characters table");

        // ! auto increment reset
        await prisma.$queryRaw`ALTER TABLE characters AUTO_INCREMENT = 1`;
        console.log("\nreset characters auto increment to 1");

        await prisma.$queryRaw`ALTER TABLE characteristics AUTO_INCREMENT = 1`;
        console.log("reset characteristics auto increment to 1");

        await prisma.$queryRaw`ALTER TABLE professionalstatus AUTO_INCREMENT = 1`;
        console.log("reset professional status auto increment to 1");

        // ! insert data into table
        characters();
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load(insertCharacters);
