-- CreateTable
CREATE TABLE "Object" (
    "id" SERIAL NOT NULL,
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
    "ay" INTEGER NOT NULL,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id")
);
