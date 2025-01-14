export interface ApiService {
    fetchApi(endpoint: string, queryParams?: Record<string, any>): Promise<any>;
    postApi(endpoint: string, data: any): Promise<any>;
    patchApi(endpoint: string, id: string, updatedData: any): Promise<any>;
    deleteApi(endpoint: string, id: string): Promise<void>
}