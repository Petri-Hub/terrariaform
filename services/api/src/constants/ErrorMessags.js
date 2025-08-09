export var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["CpuDetailsRetrievalError"] = "failed to retrieve CPU details";
    ErrorMessage["AuthorizationError"] = "unauthorized access - invalid or missing bearer token";
    ErrorMessage["MemoryDetailsRetrievalError"] = "failed to retrieve memory details";
    ErrorMessage["OperatingSystemDetailsRetrievalError"] = "failed to retrieve operating system details";
    ErrorMessage["ContainerDetailsRetrievalError"] = "failed to retrieve container details";
})(ErrorMessage || (ErrorMessage = {}));
