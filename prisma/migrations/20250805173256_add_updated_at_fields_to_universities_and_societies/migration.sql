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
    CONSTRAINT "Society_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Society" ("description", "id", "memberCount", "name", "rating", "universityId", "website") SELECT "description", "id", "memberCount", "name", "rating", "universityId", "website" FROM "Society";
DROP TABLE "Society";
ALTER TABLE "new_Society" RENAME TO "Society";
CREATE UNIQUE INDEX "Society_name_key" ON "Society"("name");
CREATE TABLE "new_University" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rating" REAL NOT NULL DEFAULT 0,
    "societyCount" INTEGER NOT NULL DEFAULT 0,
    "website" TEXT,
    "studentsUnion" TEXT,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_University" ("description", "id", "name", "rating", "societyCount", "studentsUnion", "website") SELECT "description", "id", "name", "rating", "societyCount", "studentsUnion", "website" FROM "University";
DROP TABLE "University";
ALTER TABLE "new_University" RENAME TO "University";
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
