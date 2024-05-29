/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - Added the required column `downvote` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upvote` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "downvote" INTEGER NOT NULL,
ADD COLUMN     "upvote" INTEGER NOT NULL;
