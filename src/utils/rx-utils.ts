import { Observable } from 'rxjs';

export function fromMutationObserver(target: Node, config?: MutationObserverInit): Observable<MutationRecord[]> {
    return new Observable((observer) => {

        const mutation = new MutationObserver((mutations, instance) => {
            observer.next(mutations);
        });

        mutation.observe(target, config);

        const unsubscribe = () => {
            mutation.disconnect();
        };

        return unsubscribe;
    });
}

export function fromIntersectionObserver(target: Element, options?: IntersectionObserverInit): Observable<IntersectionObserverEntry[]> {
    return new Observable((observer) => {

        const intersection = new IntersectionObserver((entries, instance) => {
            observer.next(entries);
        });

        intersection.observe(target);

        const unsubscribe = () => {
            intersection.disconnect();
        };

        return unsubscribe;
    });
}
