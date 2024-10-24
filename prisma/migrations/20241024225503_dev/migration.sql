/*
  Warnings:

  - The primary key for the `Object` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ax` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `ay` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `id` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `mass` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `radius` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `vx` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `vy` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `x` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `y` on the `Object` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Object" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "radius" BIGINT NOT NULL,
    "mass" BIGINT NOT NULL,
    "x" BIGINT NOT NULL,
    "y" BIGINT NOT NULL,
    "vx" BIGINT NOT NULL,
    "vy" BIGINT NOT NULL,
    "ax" BIGINT NOT NULL,
    "ay" BIGINT NOT NULL
);
INSERT INTO "new_Object" ("ax", "ay", "id", "mass", "name", "radius", "vx", "vy", "x", "y") SELECT "ax", "ay", "id", "mass", "name", "radius", "vx", "vy", "x", "y" FROM "Object";
DROP TABLE "Object";
ALTER TABLE "new_Object" RENAME TO "Object";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
