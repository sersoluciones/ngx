import { hasValue } from '../../utils/check';
export function match(originalPathField, duplicatePathField) {
    var validation = function (fg) {
        var original = fg.get(originalPathField);
        var duplicate = fg.get(duplicatePathField);
        if (original.value === duplicate.value) {
            if (hasValue(duplicate.errors)) {
                delete duplicate.errors.match;
                if (hasValue(duplicate.errors)) {
                    duplicate.setErrors(duplicate.errors);
                }
                else {
                    duplicate.setErrors(null);
                }
            }
            else {
                duplicate.setErrors(null);
            }
        }
        else {
            if (hasValue(duplicate.errors)) {
                duplicate.errors.match = true;
                duplicate.setErrors(duplicate.errors);
            }
            else {
                duplicate.setErrors({
                    match: true
                });
            }
        }
        return null;
    };
    return validation;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZvcm0vdmFsaWRhdGlvbnMvbWF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE1BQU0sVUFBVSxLQUFLLENBQUMsaUJBQXlCLEVBQUUsa0JBQTBCO0lBQ3ZFLElBQU0sVUFBVSxHQUFHLFVBQUMsRUFBYTtRQUU3QixJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0MsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRTdDLElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsS0FBSyxFQUFFO1lBQ3BDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFFOUIsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUM1QixTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDekM7cUJBQU07b0JBQ0gsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDN0I7YUFDSjtpQkFBTTtnQkFDSCxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCO1NBRUo7YUFBTTtZQUVILElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDNUIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6QztpQkFBTTtnQkFDSCxTQUFTLENBQUMsU0FBUyxDQUFDO29CQUNoQixLQUFLLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUM7YUFDTjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0lBRUYsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Hcm91cCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IGhhc1ZhbHVlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY2hlY2snO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoKG9yaWdpbmFsUGF0aEZpZWxkOiBzdHJpbmcsIGR1cGxpY2F0ZVBhdGhGaWVsZDogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IChmZzogRm9ybUdyb3VwKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBvcmlnaW5hbCA9IGZnLmdldChvcmlnaW5hbFBhdGhGaWVsZCk7XHJcbiAgICAgICAgY29uc3QgZHVwbGljYXRlID0gZmcuZ2V0KGR1cGxpY2F0ZVBhdGhGaWVsZCk7XHJcblxyXG4gICAgICAgIGlmIChvcmlnaW5hbC52YWx1ZSA9PT0gZHVwbGljYXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNWYWx1ZShkdXBsaWNhdGUuZXJyb3JzKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGR1cGxpY2F0ZS5lcnJvcnMubWF0Y2g7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhhc1ZhbHVlKGR1cGxpY2F0ZS5lcnJvcnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlLnNldEVycm9ycyhkdXBsaWNhdGUuZXJyb3JzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlLnNldEVycm9ycyhudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR1cGxpY2F0ZS5zZXRFcnJvcnMobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYXNWYWx1ZShkdXBsaWNhdGUuZXJyb3JzKSkge1xyXG4gICAgICAgICAgICAgICAgZHVwbGljYXRlLmVycm9ycy5tYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkdXBsaWNhdGUuc2V0RXJyb3JzKGR1cGxpY2F0ZS5lcnJvcnMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHVwbGljYXRlLnNldEVycm9ycyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHZhbGlkYXRpb247XHJcbn1cclxuIl19