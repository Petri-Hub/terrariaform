export enum ErrorMessage {
    CpuDetailsRetrievalError = 'failed to retrieve CPU details',
    AuthorizationError = 'unauthorized access - invalid or missing bearer token',
    MemoryDetailsRetrievalError = 'failed to retrieve memory details',
    OperatingSystemDetailsRetrievalError = 'failed to retrieve operating system details',
    ContainerDetailsRetrievalError = 'failed to retrieve container details',
}