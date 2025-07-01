interface RequestConfig {
  headers?: Record<string, string>
  timeout?: number
}

export abstract class BaseHttpService {
  protected readonly baseURL: string
  protected readonly defaultHeaders: Record<string, string>
  protected readonly timeout: number

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.API_URL || 'http://localhost:3001'
    this.timeout = 10000
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private getFullUrl(endpoint: string): string {
    return `${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  }

  private mergeHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    return {
      ...this.defaultHeaders,
      ...customHeaders,
    }
  }

  private async makeRequest(
    url: string, 
    options: RequestInit = {}, 
    config?: RequestConfig
  ): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), config?.timeout || this.timeout)

    try {
      const response = await fetch(this.getFullUrl(url), {
        ...options,
        headers: this.mergeHeaders(config?.headers),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    }
  }

  protected async get(url: string, config?: RequestConfig): Promise<Response> {
    return this.makeRequest(url, { method: 'GET' }, config)
  }

  protected async post(url: string, data?: any, config?: RequestConfig): Promise<Response> {
    return this.makeRequest(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }, config)
  }

  protected async put(url: string, data?: any, config?: RequestConfig): Promise<Response> {
    return this.makeRequest(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }, config)
  }

  protected async delete(url: string, config?: RequestConfig): Promise<Response> {
    return this.makeRequest(url, { method: 'DELETE' }, config)
  }
}
