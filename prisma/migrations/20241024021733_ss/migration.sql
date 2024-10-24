/*
  Warnings:

  - You are about to drop the column `reversed_x` on the `Object` table. All the data in the column will be lost.
  - You are about to drop the column `reversed_y` on the `Object` table. All the data in the column will be lost.

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
