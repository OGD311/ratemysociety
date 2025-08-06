-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "colour" TEXT NOT NULL
);

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
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "universityId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Society_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Society_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Society" ("description", "id", "memberCount", "name", "rating", "universityId", "updated_at", "website") SELECT "description", "id", "memberCount", "name", "rating", "universityId", "updated_at", "website" FROM "Society";
DROP TABLE "Society";
ALTER TABLE "new_Society" RENAME TO "Society";
CREATE UNIQUE INDEX "Society_name_key" ON "Society"("name");
CREATE UNIQUE INDEX "Society_categoryId_key" ON "Society"("categoryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
