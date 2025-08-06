/*
  Warnings:

  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fingerprint` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" REAL NOT NULL,
    "comment" TEXT NOT NULL,
    "posted_at" DATETIME NOT NULL,
    "societyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Review_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("comment", "id", "posted_at", "rating", "societyId") SELECT "comment", "id", "posted_at", "rating", "societyId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "is_banned" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
