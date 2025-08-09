import { CpuDetailsRetrievalError } from './src/errors/CpuDetailsRetrievalError';
import { MemoryDetailsRetrievalError } from './src/errors/MemoryDetailsRetrievalError';
import { OperatingSystemDetailsRetrievalError } from './src/errors/OperatingSystemDetailsRetrievalError';
import { ContainerDetailsRetrievalError } from './src/errors/ContainerDetailsRetrievalError';
function testErrorHandling() {
    console.log('Testing error handling...');
    // Test DomainError with inner error
    const originalError = new Error('Original error message');
    const cpuError = new CpuDetailsRetrievalError(originalError);
    console.log('CpuDetailsRetrievalError:');
    console.log('- Message:', cpuError.getMessage());
    console.log('- Code:', cpuError.getCode());
    console.log('- Status Code:', cpuError.getStatusCode());
    console.log('- Inner Error:', cpuError.getInnerError()?.message);
    // Test without inner error (backward compatibility)
    const cpuErrorNoInner = new CpuDetailsRetrievalError();
    console.log('\nCpuDetailsRetrievalError (no inner error):');
    console.log('- Inner Error:', cpuErrorNoInner.getInnerError());
    // Test other error types
    const memoryError = new MemoryDetailsRetrievalError(new Error('Memory error'));
    const osError = new OperatingSystemDetailsRetrievalError(new Error('OS error'));
    const containerError = new ContainerDetailsRetrievalError(new Error('Container error'));
    console.log('\nAll error types created successfully:');
    console.log('- MemoryDetailsRetrievalError:', memoryError.getMessage());
    console.log('- OperatingSystemDetailsRetrievalError:', osError.getMessage());
    console.log('- ContainerDetailsRetrievalError:', containerError.getMessage());
    console.log('\nTest completed successfully!');
}
testErrorHandling();
