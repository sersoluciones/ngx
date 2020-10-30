import { Subscription } from 'rxjs';
import { SerControlDirective } from './ser-control.directive';
export declare class SerFormElementComponent {
    formElement: SerControlDirective;
    observer: Subscription;
    get disabled(): boolean;
    get focus(): boolean;
    get active(): boolean;
    get dirty(): boolean;
    get valid(): boolean;
    get invalid(): boolean;
    get pending(): boolean;
}
