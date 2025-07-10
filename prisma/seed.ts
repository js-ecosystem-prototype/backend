import { PrismaClient } from "@prisma/client";
import { Gender, Status, Department } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding...!");
  
  // Clear existing data
  await prisma.member.deleteMany({});
  await prisma.major.deleteMany({});

  // Create data for major table
  const majorIT = await prisma.major.create({
    data: {
      nameMajor: 'Kỹ thuật phần mềm',
      codeMajor: 'SE'
    }
  });

  const member1 = await prisma.member.create({
    data: {
      name: 'Nguyen Van A',
      rollNumber: 'he204363', 
      department: Department.Ban_Chuyen_Mon,
      address: 'Số 1, đường ABC, Hà Nội',
      phone: '0987654321',
      dob: new Date('2003-05-15T00:00:00Z'), 
      gender: Gender.MALE, 
      majorId: majorIT.id, 
      email: 'luukien2910@example.com', 
      socialLink: 'https://facebook.com/',
      cohort: 'K17A',
      status: Status.Active, 
    },
  });

  console.log(`Created the member: ${member1.name}`);

  const member2 = await prisma.member.create({
    data: {
      name: 'Nguyen Van B',
      rollNumber: 'he204365', 
      department: Department.Ban_Chuyen_Mon,
      address: 'Số 1, đường ABC, Hà Nội',
      phone: '0987654321',
      dob: new Date('2003-05-15T00:00:00Z'), 
      gender: Gender.MALE, 
      majorId: majorIT.id, 
      email: 'nguyenvanb@example.com', 
      socialLink: 'https://facebook.com/',
      cohort: 'K17A',
      status: Status.Active, 
    },
  });

  console.log(`Created the member: ${member2.name}`);
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });