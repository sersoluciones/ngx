/**
 * @description Agrega 4 clases css a un elemento HTML
 * @example <body class="bos-macOS bosv-10.15.4 bn-Chrome bv-81.0.4044.129">
 * @param {Parser.Parser} bowserInstance Objeto Bowser parseado
 * @param {Renderer2} renderer Elemento a modificar
 */
export function setBowserClasses(bowserInstance, renderer) {
    renderer.addClass(document.body, 'bos-' + bowserInstance.getOSName().replace(/ +/g, '-'));
    renderer.addClass(document.body, 'bosv-' + bowserInstance.getOSVersion().replace(/ +/g, '-'));
    renderer.addClass(document.body, 'bn-' + bowserInstance.getBrowserName().replace(/ +/g, '-'));
    renderer.addClass(document.body, 'bv-' + bowserInstance.getBrowserVersion().replace(/ +/g, '-'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm93c2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJ1dGlscy9ib3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsY0FBNkIsRUFBRSxRQUFtQjtJQUMvRSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUYsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sR0FBRyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlGLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5RixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBhcnNlciB9IGZyb20gJ2Jvd3Nlcic7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIEFncmVnYSA0IGNsYXNlcyBjc3MgYSB1biBlbGVtZW50byBIVE1MXHJcbiAqIEBleGFtcGxlIDxib2R5IGNsYXNzPVwiYm9zLW1hY09TIGJvc3YtMTAuMTUuNCBibi1DaHJvbWUgYnYtODEuMC40MDQ0LjEyOVwiPlxyXG4gKiBAcGFyYW0ge1BhcnNlci5QYXJzZXJ9IGJvd3Nlckluc3RhbmNlIE9iamV0byBCb3dzZXIgcGFyc2VhZG9cclxuICogQHBhcmFtIHtSZW5kZXJlcjJ9IHJlbmRlcmVyIEVsZW1lbnRvIGEgbW9kaWZpY2FyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0Qm93c2VyQ2xhc3Nlcyhib3dzZXJJbnN0YW5jZTogUGFyc2VyLlBhcnNlciwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xyXG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ2Jvcy0nICsgYm93c2VySW5zdGFuY2UuZ2V0T1NOYW1lKCkucmVwbGFjZSgvICsvZywgJy0nKSk7XHJcbiAgICByZW5kZXJlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAnYm9zdi0nICsgYm93c2VySW5zdGFuY2UuZ2V0T1NWZXJzaW9uKCkucmVwbGFjZSgvICsvZywgJy0nKSk7XHJcbiAgICByZW5kZXJlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAnYm4tJyArIGJvd3Nlckluc3RhbmNlLmdldEJyb3dzZXJOYW1lKCkucmVwbGFjZSgvICsvZywgJy0nKSk7XHJcbiAgICByZW5kZXJlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAnYnYtJyArIGJvd3Nlckluc3RhbmNlLmdldEJyb3dzZXJWZXJzaW9uKCkucmVwbGFjZSgvICsvZywgJy0nKSk7XHJcbn1cclxuIl19