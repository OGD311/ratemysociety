-- CreateTable
CREATE TABLE "University" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "society_count" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");
