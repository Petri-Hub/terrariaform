-- CreateTable
CREATE TABLE "cpu_metrics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalUsage" REAL NOT NULL,
    "systemUsage" REAL NOT NULL,
    "userUsage" REAL NOT NULL,
    "coreUsages" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "temperature" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "memory_metrics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" REAL NOT NULL,
    "used" REAL NOT NULL,
    "free" REAL NOT NULL
);