import { of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { hasValue } from '../../utils/check';
export function alreadyExist(http, url, requestBody) {
    return (control) => {
        return of(control.value).pipe(delay(1000), switchMap((value) => {
            if (hasValue(value)) {
                requestBody.Value = value;
                return http.post(url, requestBody).pipe(map(() => ({ alreadyExist: true })), catchError(() => of(null)));
            }
            return of(null);
        }));
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJmb3JtL3ZhbGlkYXRpb25zL3JlbW90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFTN0MsTUFBTSxVQUFVLFlBQVksQ0FBQyxJQUFnQixFQUFFLEdBQVcsRUFBRSxXQUFnQztJQUN4RixPQUFPLENBQUMsT0FBb0IsRUFBdUMsRUFBRTtRQUVqRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQ1gsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDaEIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBRWpCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUUxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDckMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUNuQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQzNCLENBQUM7YUFDTDtZQUVELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FDSixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUM7QUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgQXN5bmNWYWxpZGF0b3JGbiwgRm9ybUNvbnRyb2wsIFZhbGlkYXRpb25FcnJvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlbGF5LCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tICcuLi8uLi91dGlscy9jaGVjayc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VWYWxpZGF0aW9uTW9kZWwge1xyXG4gICAgTW9kZWw6IHN0cmluZztcclxuICAgIEZpZWxkOiBzdHJpbmc7XHJcbiAgICBJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIFZhbHVlPzogYW55O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWxyZWFkeUV4aXN0KGh0dHA6IEh0dHBDbGllbnQsIHVybDogc3RyaW5nLCByZXF1ZXN0Qm9keTogQmFzZVZhbGlkYXRpb25Nb2RlbCk6IEFzeW5jVmFsaWRhdG9yRm4ge1xyXG4gICAgcmV0dXJuIChjb250cm9sOiBGb3JtQ29udHJvbCk6IE9ic2VydmFibGU8VmFsaWRhdGlvbkVycm9ycyB8IG51bGw+ID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9mKGNvbnRyb2wudmFsdWUpLnBpcGUoXHJcbiAgICAgICAgICAgIGRlbGF5KDEwMDApLFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzVmFsdWUodmFsdWUpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RCb2R5LlZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBodHRwLnBvc3QodXJsLCByZXF1ZXN0Qm9keSkucGlwZShcclxuICAgICAgICAgICAgICAgICAgICAgIG1hcCgoKSA9PiAoeyBhbHJlYWR5RXhpc3Q6IHRydWUgfSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZihudWxsKSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICkpO1xyXG4gICAgfTtcclxufVxyXG4iXX0=