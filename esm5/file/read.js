import { __values } from "tslib";
import { Observable } from 'rxjs';
/**
 * Read the content of a File or Blob using the FileReader interface.
 * This is an async interface so it makes sense to handle it with Rx.
 * @param File | Blob
 */
export function readAsArrayBuffer(blob) {
    return new Observable(function (obs) {
        if (!(blob instanceof Blob)) {
            obs.error(new Error('`blob` must be an instance of File or Blob.'));
            return;
        }
        var reader = new FileReader();
        reader.onerror = function (err) { return obs.error(err); };
        reader.onabort = function (err) { return obs.error(err); };
        reader.onload = function () { return obs.next(reader.result); };
        reader.onloadend = function () { return obs.complete(); };
        reader.readAsArrayBuffer(blob);
    });
}
/**
 * Read the content of a File or Blob using the FileReader interface.
 * This is an async interface so it makes sense to handle it with Rx.
 * @param File | Blob
 */
export function readAsDataURL(blob) {
    return new Observable(function (obs) {
        if (!(blob instanceof Blob)) {
            obs.error(new Error('`blob` must be an instance of File or Blob.'));
            return;
        }
        var reader = new FileReader();
        reader.onerror = function (err) { return obs.error(err); };
        reader.onabort = function (err) { return obs.error(err); };
        reader.onload = function () { return obs.next(reader.result); };
        reader.onloadend = function () { return obs.complete(); };
        reader.readAsDataURL(blob);
    });
}
/**
 * @description Get file type based on header info
 * @param arrayBuffer Result of FileReader.readAsArrayBuffer()
 */
export function getFileType(arrayBuffer) {
    var e_1, _a;
    var arr = (new Uint8Array(arrayBuffer)).subarray(0, 4);
    var header = '';
    try {
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var i = arr_1_1.value;
            header += i.toString(16);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log('Header file: ', header);
    switch (header) {
        case '89504e47':
            return 'png';
        case '47494638':
            return 'gif';
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
            return 'jpeg';
        case '25504446':
            return 'ia';
        case '504b34':
            return 'xlsx';
        case '25504446':
            return 'pdf';
        default:
            return 'unknown';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZXJzb2wvbmd4LyIsInNvdXJjZXMiOlsiZmlsZS9yZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWxDOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsSUFBVTtJQUV4QyxPQUFPLElBQUksVUFBVSxDQUFDLFVBQUMsR0FBUTtRQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksSUFBSSxDQUFDLEVBQUU7WUFDekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDLENBQUM7WUFDcEUsT0FBTztTQUNWO1FBRUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUVoQyxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBZCxDQUFjLENBQUM7UUFDdkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQWQsQ0FBYyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsY0FBTSxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUF2QixDQUF1QixDQUFDO1FBQzlDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsY0FBTSxPQUFBLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBZCxDQUFjLENBQUM7UUFFeEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQVU7SUFFcEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFDLEdBQVE7UUFDM0IsSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFO1lBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE9BQU87U0FDVjtRQUVELElBQU0sTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFFaEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQWQsQ0FBYyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFkLENBQWMsQ0FBQztRQUN2QyxNQUFNLENBQUMsTUFBTSxHQUFHLGNBQU0sT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQztRQUM5QyxNQUFNLENBQUMsU0FBUyxHQUFHLGNBQU0sT0FBQSxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQWQsQ0FBYyxDQUFDO1FBRXhDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxXQUF3Qjs7SUFFaEQsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFekQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOztRQUNoQixLQUFnQixJQUFBLFFBQUEsU0FBQSxHQUFHLENBQUEsd0JBQUEseUNBQUU7WUFBaEIsSUFBTSxDQUFDLGdCQUFBO1lBQ1IsTUFBTSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUI7Ozs7Ozs7OztJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXJDLFFBQVEsTUFBTSxFQUFFO1FBQ1osS0FBSyxVQUFVO1lBQ1gsT0FBTyxLQUFLLENBQUM7UUFFakIsS0FBSyxVQUFVO1lBQ1gsT0FBTyxLQUFLLENBQUM7UUFFakIsS0FBSyxVQUFVLENBQUM7UUFDaEIsS0FBSyxVQUFVLENBQUM7UUFDaEIsS0FBSyxVQUFVLENBQUM7UUFDaEIsS0FBSyxVQUFVLENBQUM7UUFDaEIsS0FBSyxVQUFVO1lBQ1gsT0FBTyxNQUFNLENBQUM7UUFFbEIsS0FBSyxVQUFVO1lBQ1gsT0FBTyxJQUFJLENBQUM7UUFFaEIsS0FBSyxRQUFRO1lBQ1QsT0FBTyxNQUFNLENBQUM7UUFFbEIsS0FBSyxVQUFVO1lBQ1gsT0FBTyxLQUFLLENBQUM7UUFFakI7WUFDSSxPQUFPLFNBQVMsQ0FBQztLQUN4QjtBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vKipcclxuICogUmVhZCB0aGUgY29udGVudCBvZiBhIEZpbGUgb3IgQmxvYiB1c2luZyB0aGUgRmlsZVJlYWRlciBpbnRlcmZhY2UuXHJcbiAqIFRoaXMgaXMgYW4gYXN5bmMgaW50ZXJmYWNlIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGhhbmRsZSBpdCB3aXRoIFJ4LlxyXG4gKiBAcGFyYW0gRmlsZSB8IEJsb2JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkQXNBcnJheUJ1ZmZlcihibG9iOiBCbG9iKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9iczogYW55KTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKCEoYmxvYiBpbnN0YW5jZW9mIEJsb2IpKSB7XHJcbiAgICAgICAgICAgIG9icy5lcnJvcihuZXcgRXJyb3IoJ2BibG9iYCBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIEZpbGUgb3IgQmxvYi4nKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblxyXG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gZXJyID0+IG9icy5lcnJvcihlcnIpO1xyXG4gICAgICAgIHJlYWRlci5vbmFib3J0ID0gZXJyID0+IG9icy5lcnJvcihlcnIpO1xyXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiBvYnMubmV4dChyZWFkZXIucmVzdWx0KTtcclxuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4gb2JzLmNvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogUmVhZCB0aGUgY29udGVudCBvZiBhIEZpbGUgb3IgQmxvYiB1c2luZyB0aGUgRmlsZVJlYWRlciBpbnRlcmZhY2UuXHJcbiAqIFRoaXMgaXMgYW4gYXN5bmMgaW50ZXJmYWNlIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGhhbmRsZSBpdCB3aXRoIFJ4LlxyXG4gKiBAcGFyYW0gRmlsZSB8IEJsb2JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkQXNEYXRhVVJMKGJsb2I6IEJsb2IpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzOiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAoIShibG9iIGluc3RhbmNlb2YgQmxvYikpIHtcclxuICAgICAgICAgICAgb2JzLmVycm9yKG5ldyBFcnJvcignYGJsb2JgIG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgRmlsZSBvciBCbG9iLicpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSBlcnIgPT4gb2JzLmVycm9yKGVycik7XHJcbiAgICAgICAgcmVhZGVyLm9uYWJvcnQgPSBlcnIgPT4gb2JzLmVycm9yKGVycik7XHJcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IG9icy5uZXh0KHJlYWRlci5yZXN1bHQpO1xyXG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiBvYnMuY29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiBHZXQgZmlsZSB0eXBlIGJhc2VkIG9uIGhlYWRlciBpbmZvXHJcbiAqIEBwYXJhbSBhcnJheUJ1ZmZlciBSZXN1bHQgb2YgRmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcigpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZVR5cGUoYXJyYXlCdWZmZXI6IEFycmF5QnVmZmVyKSB7XHJcblxyXG4gICAgY29uc3QgYXJyID0gKG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSkuc3ViYXJyYXkoMCwgNCk7XHJcblxyXG4gICAgbGV0IGhlYWRlciA9ICcnO1xyXG4gICAgZm9yIChjb25zdCBpIG9mIGFycikge1xyXG4gICAgICAgIGhlYWRlciArPSBpLnRvU3RyaW5nKDE2KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZygnSGVhZGVyIGZpbGU6ICcsIGhlYWRlcik7XHJcblxyXG4gICAgc3dpdGNoIChoZWFkZXIpIHtcclxuICAgICAgICBjYXNlICc4OTUwNGU0Nyc6XHJcbiAgICAgICAgICAgIHJldHVybiAncG5nJztcclxuXHJcbiAgICAgICAgY2FzZSAnNDc0OTQ2MzgnOlxyXG4gICAgICAgICAgICByZXR1cm4gJ2dpZic7XHJcblxyXG4gICAgICAgIGNhc2UgJ2ZmZDhmZmUwJzpcclxuICAgICAgICBjYXNlICdmZmQ4ZmZlMSc6XHJcbiAgICAgICAgY2FzZSAnZmZkOGZmZTInOlxyXG4gICAgICAgIGNhc2UgJ2ZmZDhmZmUzJzpcclxuICAgICAgICBjYXNlICdmZmQ4ZmZlOCc6XHJcbiAgICAgICAgICAgIHJldHVybiAnanBlZyc7XHJcblxyXG4gICAgICAgIGNhc2UgJzI1NTA0NDQ2JzpcclxuICAgICAgICAgICAgcmV0dXJuICdpYSc7XHJcblxyXG4gICAgICAgIGNhc2UgJzUwNGIzNCc6XHJcbiAgICAgICAgICAgIHJldHVybiAneGxzeCc7XHJcblxyXG4gICAgICAgIGNhc2UgJzI1NTA0NDQ2JzpcclxuICAgICAgICAgICAgcmV0dXJuICdwZGYnO1xyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==