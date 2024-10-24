/*
  Warnings:

  - The primary key for the `Object` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ax` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `ay` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `mass` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `radius` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `vx` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `vy` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `x` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `y` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Object" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "radius" INTEGER NOT NULL,
    "mass" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "vx" INTEGER NOT NULL,
    "vy" INTEGER NOT NULL,
    "ax" INTEGER NOT NULL,
    "ay" INTEGER NOT NULL
);
INSERT INTO "new_Object" ("ax", "ay", "id", "mass", "name", "radius", "vx", "vy", "x", "y") SELECT "ax", "ay", "id", "mass", "name", "radius", "vx", "vy", "x", "y" FROM "Object";
DROP TABLE "Object";
ALTER TABLE "new_Object" RENAME TO "Object";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
