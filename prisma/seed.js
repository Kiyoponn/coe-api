const { PrismaClient } = require('@prisma/client');
const { characters, characteristics, professionalstatus } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
  try {
    // ! delete records if exist
    await prisma.characteristics.deleteMany();
    console.log('\ndeleted records in characteristics table');

    await prisma.professionalstatus.deleteMany();
    console.log('deleted records in professional status table');
    
    await prisma.characters.deleteMany();
    console.log('deleted records in characters table');
    

    // ! auto increment reset
    await prisma.$queryRaw`ALTER TABLE characters AUTO_INCREMENT = 1`;
    console.log('\nreset characters auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE characteristics AUTO_INCREMENT = 1`;
    console.log('reset characteristics auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE professionalstatus AUTO_INCREMENT = 1`;
    console.log('reset professional status auto increment to 1');

    // ! insert data into table
    await prisma.characters.createMany({
      data: characters,
    });
    console.log('\nadded characters data');
    
    await prisma.characteristics.createMany({
      data: characteristics,
    });
    console.log('added characteristics data');
    
    await prisma.professionalstatus.createMany({
      data: professionalstatus,
    });
    console.log('added professional status data');

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
