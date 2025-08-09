export var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["CpuDetailsRetrievalError"] = 1] = "CpuDetailsRetrievalError";
    ErrorCode[ErrorCode["AuthorizationError"] = 2] = "AuthorizationError";
    ErrorCode[ErrorCode["MemoryDetailsRetrievalError"] = 3] = "MemoryDetailsRetrievalError";
    ErrorCode[ErrorCode["OperatingSystemDetailsRetrievalError"] = 4] = "OperatingSystemDetailsRetrievalError";
    ErrorCode[ErrorCode["ContainerDetailsRetrievalError"] = 5] = "ContainerDetailsRetrievalError";
})(ErrorCode || (ErrorCode = {}));
