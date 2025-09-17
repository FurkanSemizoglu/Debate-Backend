-- CreateEnum
CREATE TYPE "public"."RoomStatus" AS ENUM ('WAITING', 'LIVE', 'FINISHED');

-- CreateEnum
CREATE TYPE "public"."ParticipantRole" AS ENUM ('PROPOSER', 'OPPONENT', 'AUDIENCE');

-- CreateTable
CREATE TABLE "public"."DebateRoom" (
    "id" TEXT NOT NULL,
    "debateId" TEXT NOT NULL,
    "status" "public"."RoomStatus" NOT NULL DEFAULT 'WAITING',
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DebateRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DebateParticipant" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "public"."ParticipantRole" NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),

    CONSTRAINT "DebateParticipant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."DebateRoom" ADD CONSTRAINT "DebateRoom_debateId_fkey" FOREIGN KEY ("debateId") REFERENCES "public"."Debate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DebateParticipant" ADD CONSTRAINT "DebateParticipant_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."DebateRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DebateParticipant" ADD CONSTRAINT "DebateParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
