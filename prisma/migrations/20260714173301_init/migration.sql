-- CreateEnum
CREATE TYPE "Profession" AS ENUM ('DENTIST', 'DENTAL_STUDENT', 'OTHER');

-- CreateEnum
CREATE TYPE "Phase" AS ENUM ('NEVER_APPLIED', 'TOOK_COURSE_NOT_CONFIDENT', 'ALREADY_APPLIES', 'WANT_TO_START_HARMONIZATION');

-- CreateEnum
CREATE TYPE "Intent" AS ENUM ('AS_SOON_AS_OPEN', 'NEXT_3_MONTHS', 'STILL_RESEARCHING');

-- CreateEnum
CREATE TYPE "Source" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'REFERRAL', 'WHATSAPP', 'OTHER');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cityState" TEXT NOT NULL,
    "profession" "Profession" NOT NULL,
    "professionOther" TEXT,
    "cro" TEXT,
    "phase" "Phase" NOT NULL,
    "goal" TEXT NOT NULL,
    "intent" "Intent" NOT NULL,
    "source" "Source" NOT NULL,
    "sourceOther" TEXT,
    "whatsappConsent" BOOLEAN NOT NULL,
    "mainDifficulty" TEXT NOT NULL,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "fbclid" TEXT,
    "gclid" TEXT,
    "referrer" TEXT,
    "landingPath" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_whatsapp_idx" ON "Lead"("whatsapp");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_utmCampaign_idx" ON "Lead"("utmCampaign");
