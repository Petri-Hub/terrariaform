import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export abstract class HttpService {

    private client: AxiosInstance = axios.create({
        baseURL: process.env.API_URL,
        timeout: 10000,
    });

    protected async get<T>(
        url: string, 
        config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        return await this.client.get<T>(url, config)
    }

    protected async post<T, K>(
        url: string,
        data: K,
        config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        return await this.client.post<T>(url, data, config)
    }

    protected async put<T, K>(
        url: string,
        data: K,
        config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        return await this.client.put<T>(url, data, config)
    }

    protected async patch<T, K>(
        url: string,
        data: K,
        config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        return await this.client.patch<T>(url, data, config)
    }

    protected async delete<T>(
        url: string,
        config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        return await this.client.delete<T>(url, config)
    }
}
