/*
  Warnings:

  - Added the required column `universityId` to the `Society` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Society" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rating" REAL NOT NULL DEFAULT 0,
    "memberCount" INTEGER NOT NULL DEFAULT 0,
    "website" TEXT,
    "universityId" INTEGER NOT NULL,
    CONSTRAINT "Society_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Society" ("description", "id", "memberCount", "name", "rating", "website") SELECT "description", "id", "memberCount", "name", "rating", "website" FROM "Society";
DROP TABLE "Society";
ALTER TABLE "new_Society" RENAME TO "Society";
CREATE UNIQUE INDEX "Society_name_key" ON "Society"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
