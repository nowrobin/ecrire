/*
  Warnings:

  - You are about to drop the column `downvote` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `upvote` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "downvote",
DROP COLUMN "upvote",
ADD COLUMN     "vote" INTEGER NOT NULL DEFAULT 0;
