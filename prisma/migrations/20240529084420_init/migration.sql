-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "feedback" TEXT NOT NULL,
    "upvote" INTEGER NOT NULL,
    "downvote" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
