-- CreateTable
CREATE TABLE "Society" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rating" REAL NOT NULL DEFAULT 0,
    "memberCount" INTEGER NOT NULL DEFAULT 0,
    "website" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Society_name_key" ON "Society"("name");
