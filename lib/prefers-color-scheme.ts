/**
 * @description
 * Clase para obtener, observar y cambiar el esquema de color claro/oscuro
 * @example
 * this.colorscheme = new PrefersColorScheme();
 * this.colorscheme.init(); // Setea el esquema inicial
 * this.colorscheme.watch(); // Observa cambio de esquema en OS
 */
export class PrefersColorScheme {
  Scheme: MediaQueryList;
  SchemeLightClassName: string;
  SchemeDarkClassName: string;

  /**
   * Crea una instancia de PrefersColorScheme
   * @param SchemeLightClassName - Clase css opcional para el esquema de color claro
   * @param SchemeDarkClassName - Clase css opcional para el esquema de color oscuro
   */
  constructor(SchemeLightClassName = 'scheme-light', SchemeDarkClassName = 'scheme-dark') {
    this.SchemeLightClassName = SchemeLightClassName;
    this.SchemeDarkClassName = SchemeDarkClassName;
    this.Scheme = window.matchMedia('(prefers-color-scheme: dark)');
  }

  /**
   * @description
   * Inicializar el esquema de color
   * @usageNotes
   * Usarse unicamente si se desea aplicar el esquema de color acorde al esquema de color del sistema operativo
   */
  init() {
    if (this.Scheme.matches) {
      this.enableDark();
    } else {
      this.enableLight();
    }
  }

  /**
   * @description
   * Obtener el esquema de color actual del SO
   * @returns {string} Esquema de color
   */
  get(): string {
    if (this.Scheme.matches) {
      return 'dark';
    } else {
      return 'light';
    }
  }

  /**
   * @description
   * Agrega SchemeDarkClassName y remueve SchemeLightClassName a la etiqueta body
   */
  enableDark() {
    const body = document.getElementsByTagName('body')[0];

    if (body.classList.contains(this.SchemeLightClassName)) {
      body.classList.remove(this.SchemeLightClassName);
    }

    body.classList.add(this.SchemeDarkClassName);
  }

  /**
   * @description
   * Agrega SchemeLightClassName y remueve SchemeDarkClassName a la etiqueta body
   */
  enableLight() {
    const body = document.getElementsByTagName('body')[0];

    if (body.classList.contains(this.SchemeDarkClassName)) {
      body.classList.remove(this.SchemeDarkClassName);
    }

    body.classList.add(this.SchemeLightClassName);
  }

  /**
   * @description
   * Habilita el cambio automatico de esquema de color según el cambio de esquema de color del SO
   */
  watch() {

    const setScheme = (ev: MediaQueryListEvent) => {
      if (ev.matches) {
        console.log('Changed to dark mode');
        this.enableDark();
      } else {
        console.log('Changed to light mode');
        this.enableLight();
      }
    };

    if (typeof this.Scheme.onchange === 'function') {

      this.Scheme.onchange  = setScheme;

    } else if (typeof this.Scheme.addEventListener === 'function') {

      this.Scheme.addEventListener('change', setScheme);

    // tslint:disable-next-line: deprecation
    } else if (typeof this.Scheme.addListener === 'function') {

      // tslint:disable-next-line: deprecation
      this.Scheme.addListener(setScheme);

    }
  }

}
