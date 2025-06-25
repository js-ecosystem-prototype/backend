/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Inactive', 'Ban');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('Ban_Chuyen_Mon', 'Ban_Noi_Dung', 'Ban_Van_Hoa', 'Ban_Doi_Ngoai', 'Ban_Truyen_Thong');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "tbl_members" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "roll_number" VARCHAR(8) NOT NULL,
    "department" "Department" NOT NULL,
    "address" VARCHAR(255),
    "phone" VARCHAR(10) NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "majorId" TEXT,
    "email" VARCHAR(255) NOT NULL,
    "social_link" VARCHAR(255),
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tbl_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_majors" (
    "id" TEXT NOT NULL,
    "name_major" VARCHAR(50) NOT NULL,
    "code_major" VARCHAR(50) NOT NULL,

    CONSTRAINT "tbl_majors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_members_roll_number_key" ON "tbl_members"("roll_number");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_members_email_key" ON "tbl_members"("email");

-- AddForeignKey
ALTER TABLE "tbl_members" ADD CONSTRAINT "tbl_members_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "tbl_majors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
