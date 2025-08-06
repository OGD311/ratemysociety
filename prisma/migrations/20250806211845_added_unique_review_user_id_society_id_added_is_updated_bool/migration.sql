-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" REAL NOT NULL,
    "comment" TEXT NOT NULL,
    "posted_at" DATETIME NOT NULL,
    "is_updated" BOOLEAN NOT NULL DEFAULT false,
    "societyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Review_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("comment", "id", "posted_at", "rating", "societyId", "userId") SELECT "comment", "id", "posted_at", "rating", "societyId", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE UNIQUE INDEX "Review_userId_societyId_key" ON "Review"("userId", "societyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
