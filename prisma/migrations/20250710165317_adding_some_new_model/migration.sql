/*
  Warnings:

  - The values [Ban_Chuyen_Mon,Ban_Noi_Dung,Ban_Van_Hoa,Ban_Doi_Ngoai,Ban_Truyen_Thong] on the enum `Department` will be removed. If these variants are still used in the database, this will fail.
  - The values [MALE,FEMALE,OTHER] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `code_major` on the `tbl_majors` table. All the data in the column will be lost.
  - You are about to drop the column `name_major` on the `tbl_majors` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Department_new" AS ENUM ('BanChuyenMon', 'BanNoiDung', 'BanVanHoa', 'BanDoiNgoai', 'BanTruyenThong');
ALTER TABLE "tbl_members" ALTER COLUMN "department" TYPE "Department_new" USING ("department"::text::"Department_new");
ALTER TYPE "Department" RENAME TO "Department_old";
ALTER TYPE "Department_new" RENAME TO "Department";
DROP TYPE "Department_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('Male', 'Female', 'Other');
ALTER TABLE "tbl_members" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterTable
ALTER TABLE "tbl_majors" DROP COLUMN "code_major",
DROP COLUMN "name_major",
ADD COLUMN     "major_code" VARCHAR(50),
ADD COLUMN     "major_name" VARCHAR(50);

-- CreateTable
CREATE TABLE "tbl_users" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "google_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tbl_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tbl_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user_has_role" (
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tbl_user_has_role_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "tbl_permission" (
    "id" TEXT NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tbl_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_role_has_permission" (
    "permission_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tbl_role_has_permission_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_memberId_key" ON "tbl_users"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_google_id_key" ON "tbl_users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_role_name_key" ON "tbl_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_permission_path_key" ON "tbl_permission"("path");

-- AddForeignKey
ALTER TABLE "tbl_users" ADD CONSTRAINT "tbl_users_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "tbl_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_has_role" ADD CONSTRAINT "tbl_user_has_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_has_role" ADD CONSTRAINT "tbl_user_has_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "tbl_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_role_has_permission" ADD CONSTRAINT "tbl_role_has_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "tbl_permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_role_has_permission" ADD CONSTRAINT "tbl_role_has_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "tbl_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
