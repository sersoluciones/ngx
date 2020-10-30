import { __decorate } from "tslib";
import { Directive, OnChanges, Input, ElementRef, Renderer2 } from '@angular/core';
import { readAsDataURL } from '../file/read';
import { take } from 'rxjs/operators';
import { AwsService } from '../aws/aws.service';
import { hasValue } from '../utils/check';
let BgImageDirective = class BgImageDirective {
    constructor(el, rendered, aws) {
        this.el = el;
        this.rendered = rendered;
        this.aws = aws;
        this.imageRegex = /(image\/(jpe?g|png|gif|bmp))/i;
    }
    ngOnChanges() {
        if (hasValue(this.image.file) && this.image.file instanceof File && this.imageRegex.test(this.image.file.type)) {
            readAsDataURL(this.image.file).pipe(take(1)).subscribe((result) => {
                this.rendered.setStyle(this.el.nativeElement, 'background-image', `url(${result})`);
            });
        }
        else if (hasValue(this.image.url)) {
            this.rendered.setStyle(this.el.nativeElement, 'background-image', this.aws.getS3BgUrl(this.image.url));
        }
        else {
            this.rendered.removeStyle(this.el.nativeElement, 'background-image');
        }
    }
};
BgImageDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: AwsService }
];
__decorate([
    Input('bgImage')
], BgImageDirective.prototype, "image", void 0);
BgImageDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[bgImage]'
    })
], BgImageDirective);
export { BgImageDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmctaW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJ1aS9iZy1pbWFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFXMUMsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFNekIsWUFBb0IsRUFBYyxFQUFVLFFBQW1CLEVBQVUsR0FBZTtRQUFwRSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFGeEYsZUFBVSxHQUFHLCtCQUErQixDQUFDO0lBRStDLENBQUM7SUFFN0YsV0FBVztRQUNQLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLFlBQVksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBRTVHLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3hGLENBQUMsQ0FBQyxDQUFDO1NBRU47YUFBTSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMxRzthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUN4RTtJQUNMLENBQUM7Q0FFSixDQUFBOztZQWhCMkIsVUFBVTtZQUFvQixTQUFTO1lBQWUsVUFBVTs7QUFIeEY7SUFEQyxLQUFLLENBQUMsU0FBUyxDQUFDOytDQUNGO0FBSE4sZ0JBQWdCO0lBSjVCLFNBQVMsQ0FBQztRQUNQLCtDQUErQztRQUMvQyxRQUFRLEVBQUUsV0FBVztLQUN4QixDQUFDO0dBQ1csZ0JBQWdCLENBc0I1QjtTQXRCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uQ2hhbmdlcywgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyByZWFkQXNEYXRhVVJMIH0gZnJvbSAnLi4vZmlsZS9yZWFkJztcclxuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQXdzU2VydmljZSB9IGZyb20gJy4uL2F3cy9hd3Muc2VydmljZSc7XHJcbmltcG9ydCB7IGhhc1ZhbHVlIH0gZnJvbSAnLi4vdXRpbHMvY2hlY2snO1xyXG5cclxuaW50ZXJmYWNlIEJnSW1hZ2Uge1xyXG4gICAgdXJsPzogc3RyaW5nO1xyXG4gICAgZmlsZT86IEZpbGU7XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcclxuICAgIHNlbGVjdG9yOiAnW2JnSW1hZ2VdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmdJbWFnZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgQElucHV0KCdiZ0ltYWdlJylcclxuICAgIGltYWdlOiBCZ0ltYWdlO1xyXG4gICAgaW1hZ2VSZWdleCA9IC8oaW1hZ2VcXC8oanBlP2d8cG5nfGdpZnxibXApKS9pO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZWQ6IFJlbmRlcmVyMiwgcHJpdmF0ZSBhd3M6IEF3c1NlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgICAgIGlmIChoYXNWYWx1ZSh0aGlzLmltYWdlLmZpbGUpICYmIHRoaXMuaW1hZ2UuZmlsZSBpbnN0YW5jZW9mIEZpbGUgJiYgdGhpcy5pbWFnZVJlZ2V4LnRlc3QodGhpcy5pbWFnZS5maWxlLnR5cGUpKSB7XHJcblxyXG4gICAgICAgICAgICByZWFkQXNEYXRhVVJMKHRoaXMuaW1hZ2UuZmlsZSkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZC5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWltYWdlJywgYHVybCgke3Jlc3VsdH0pYCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGhhc1ZhbHVlKHRoaXMuaW1hZ2UudXJsKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtaW1hZ2UnLCB0aGlzLmF3cy5nZXRTM0JnVXJsKHRoaXMuaW1hZ2UudXJsKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZC5yZW1vdmVTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWltYWdlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=