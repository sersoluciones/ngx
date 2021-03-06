import { takeUntil, filter, map, switchMap } from 'rxjs/operators';
import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output, OnDestroy } from '@angular/core';
import { fromEvent, merge, of, ReplaySubject, timer } from 'rxjs';

export interface LongPressEventClick {
    state: string;
    event: MouseEvent | TouchEvent;
}

@Directive({
    selector: '[longPress]'
})
export class LongPressDirective implements OnDestroy {

    @Input() tresshold = 1000;

    @Output() onShortPress: EventEmitter<any> = new EventEmitter();
    @Output() onLongPress: EventEmitter<any> = new EventEmitter();
    @Output() onLongPressing: EventEmitter<any> = new EventEmitter();
    @Output() onLongPressEnd: EventEmitter<any> = new EventEmitter();
    notifierDestroySubs: ReplaySubject<any> = new ReplaySubject();

    private move = false;
    @HostBinding('class.longpress') private longPressing = false;

    constructor(elementRef: ElementRef) {

        // Mouse events
        const mousedown = fromEvent<MouseEvent>(elementRef.nativeElement, 'mousedown').pipe(
            filter(event => this.isLeftClick(event)),
            map((event) => {
                return {
                    state: 'up',
                    event
                };
            })
        );

        const mouseup = fromEvent<MouseEvent>(elementRef.nativeElement, 'mouseup').pipe(
            filter(event => this.isLeftClick(event)),
            map(event => {
                return {
                    state: 'down',
                    event
                };
            })
        );

        // Touch events
        const touchstart = fromEvent<TouchEvent>(elementRef.nativeElement, 'touchstart').pipe(map(event => {
            return {
                state: 'up',
                event
            };
        }));

        const touchEnd = fromEvent<TouchEvent>(elementRef.nativeElement, 'touchend').pipe(map(event => {

            if (!this.move) {
                event.preventDefault();
                event.stopPropagation();
                event.cancelBubble = true;
                event.returnValue = false;
            }

            return {
                state: 'down',
                event
            };
        }));

        const touchMove = fromEvent(elementRef.nativeElement, 'touchmove').pipe(
            map(event => {

                this.move = true;

                return {
                    state: 'move',
                    event
                };
            }));

        merge(mousedown, mouseup, touchstart, touchEnd, touchMove)
            .pipe(
                takeUntil(this.notifierDestroySubs),
                switchMap(e => {
                    return e.state === 'up' ? timer(this.tresshold).pipe(map(() => e)) : of(e);
                })
            )
            .subscribe((e) => {

                switch (e.state) {
                    case 'up':

                        this.longPressing = true;
                        this.onLongPressing.emit(e.event);
                        this.onLongPress.emit(e.event);

                        break;

                    case 'down':

                        if (this.move) {
                            this.move = false;
                        } else if (this.longPressing) {
                            this.longPressing = false;
                            this.onLongPressEnd.emit(e.event);
                        } else {
                            this.onShortPress.emit(e.event);
                        }

                        break;

                }
            });
    }

    isLeftClick(event: MouseEvent) {
        if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
            return false;
        } else if ('buttons' in event && 'button' in event) {
            return event.button === 0;
        } else if ('which' in event) {
            return (event as MouseEvent).which === 1;
        } else {
            return ((event as MouseEvent).button === 0 || (event as MouseEvent).type === 'click');
        }
    }

    ngOnDestroy() {
        this.notifierDestroySubs.next();
        this.notifierDestroySubs.complete();
    }

}
