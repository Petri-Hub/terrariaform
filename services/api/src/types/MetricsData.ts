export type CpuMetrics = {
    id?: number
    timestamp: number
    total: number
    system: number
    user: number
    cores: string // JSON string of cores array
    temperature: number
}

export type MemoryMetrics = {
    id?: number
    timestamp: number
    total: number
    used: number
    free: number
}

export type MetricsQueryParams = {
    startTime?: string
    endTime?: string
    limit?: number
    granularity?: 'minute' | 'hour' | 'day'
}