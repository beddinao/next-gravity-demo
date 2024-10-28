/*
  Warnings:

  - Added the required column `blue` to the `Object` table without a default value. This is not possible if the table is not empty.
  - Added the required column `green` to the `Object` table without a default value. This is not possible if the table is not empty.
  - Added the required column `red` to the `Object` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Object" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "radius" INTEGER NOT NULL,
    "mass" INTEGER NOT NULL,
    "red" INTEGER NOT NULL,
    "green" INTEGER NOT NULL,
    "blue" INTEGER NOT NULL,
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
