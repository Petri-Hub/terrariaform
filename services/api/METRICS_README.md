# Metrics Storage Implementation

## Current Implementation (In-Memory)

This implementation provides historical metrics storage using in-memory arrays. The system collects CPU and memory metrics every 10 seconds and provides REST API endpoints to query historical data.

### API Endpoints

- `GET /metrics/cpu` - Retrieve historical CPU data
- `GET /metrics/memory` - Retrieve historical memory data  
- `GET /metrics/info` - Storage information and statistics

### Query Parameters

All metrics endpoints support the following query parameters:
- `from` - Start timestamp (Unix milliseconds)
- `to` - End timestamp (Unix milliseconds)
- `limit` - Maximum number of records to return (default: 100, max: 1000)

### Data Collection

The system automatically collects metrics every 10 seconds using `setInterval` and stores:

**CPU Metrics:**
- Timestamp
- Total CPU usage percentage
- System CPU usage percentage  
- User CPU usage percentage
- Per-core CPU usage array

**Memory Metrics:**
- Timestamp
- Total memory (bytes)
- Used memory (bytes)
- Free memory (bytes)

### Storage Limitations

- **In-memory only**: Data is lost on container restart
- **Max 1000 records**: Automatically trims older records to maintain performance
- **No persistence**: Suitable for development and testing

## Migration to SQLite

To enable persistent storage, the following changes are needed:

1. **Add SQLite dependencies** (when network access is available):
```json
{
  "dependencies": {
    "better-sqlite3": "^8.0.0"
  },
  "devDependencies": {
    "@types/better-sqlite3": "^7.6.0"
  }
}
```

2. **Update DatabaseService.ts** to use SQLite instead of in-memory arrays
3. **Enable database volume mount** in docker-compose.yml (already configured)
4. **Database cleanup policies** for long-term storage management

### Database Schema (for SQLite migration)

```sql
CREATE TABLE cpu_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp INTEGER NOT NULL,
    total REAL NOT NULL,
    system REAL NOT NULL,
    user REAL NOT NULL,
    cores TEXT NOT NULL -- JSON array
);

CREATE TABLE memory_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp INTEGER NOT NULL,
    total INTEGER NOT NULL,
    used INTEGER NOT NULL,
    free INTEGER NOT NULL
);

CREATE INDEX idx_cpu_timestamp ON cpu_metrics(timestamp);
CREATE INDEX idx_memory_timestamp ON memory_metrics(timestamp);
```