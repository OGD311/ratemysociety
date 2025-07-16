/*
  Warnings:

  - You are about to drop the column `society_count` on the `University` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_University" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "societyCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_University" ("id", "name", "rating") SELECT "id", "name", "rating" FROM "University";
DROP TABLE "University";
ALTER TABLE "new_University" RENAME TO "University";
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
