export type CpuMetricsData = {
    id?: number
    timestamp: number
    total: number
    system: number
    user: number
    cores: string // JSON string of number array
}

export type MemoryMetricsData = {
    id?: number
    timestamp: number
    total: number
    used: number
    free: number
}

export type MetricsQuery = {
    from?: number
    to?: number
    limit?: number
}

export type HistoricalCpuData = {
    id: number
    timestamp: number
    total: number
    system: number
    user: number
    cores: number[]
}

export type HistoricalMemoryData = {
    id: number
    timestamp: number
    total: number
    used: number
    free: number
}