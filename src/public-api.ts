/*
 * Public API Surface of ngx
 */

export * from './cookie/cookies.service';
export * from './external-script/external-script.service';
export * from './fullscreen/fullscreen-interface';
export * from './prefers-color-scheme/prefers-color-scheme.service';

// AWS
export * from './aws/aws.module';
export * from './aws/aws.service';
export * from './aws/Iaws';

// Google
export * from './google/google-sdk.module';
export * from './google/google-sdk.service';
export * from './google/config/google-sdk.config';
export * from './google/Igoogle';

// Facebook
export * from './facebook/facebook-sdk.module';
export * from './facebook/facebook-sdk.service';
export * from './facebook/config/facebook-sdk.config';
export * from './facebook/Ifacebook';

// GraphQL
export * from './graphql/utils';

// Utils
export * from './utils/object';
export * from './utils/array';
export * from './utils/date';
export * from './utils/diacritics';
export * from './utils/bowser';
export * from './utils/check';
export * from './utils/navigator';
export * from './utils/random';
export * from './utils/keyboard-keys';
export * from './utils/patterns';
export * from './utils/rx-utils';
export * from './utils/co';

// File
export * from './file/read';

// Forms
export * from './form/validations/custom-validators';
export * from './form/ser-form-element/ser-form-element.component';
export * from './form/ser-form-element/ser-control.directive';
export * from './form/ser-errors/ser-errors';
export * from './form/ser-errors/ser-errors.directive';
export * from './form/ser-errors/ser-error.directive';
export * from './form/grow-on-input.directive';
export * from './form/input-integer.directive';
export * from './form/input-float.directive';
export * from './form/input-currency/input-currency.component';
export * from './form/input-regex.directive';
export * from './form/input-regex-only.directive';
export * from './form/input-lower-case.directive';
export * from './form/input-name-case.directive';
export * from './form/ser-form.module';

// Select
export * from './form/select/ser-select.interface';
export * from './form/select/ser-select.service';
export * from './form/select/ser-select-menu-item.directive';
export * from './form/select/ser-select.component';
export * from './form/select/ser-select.module';

// Files
export * from './form/file/file.interface';
export * from './form/file/files/input-file-item.directive';
export * from './form/file/files/input-file.component';
export * from './form/file/images/input-image.component';
export * from './form/file/file.module';

// Date
export * from './form/date/base/interfaces';
export * from './form/date/ser-date.interface';
export * from './form/date/single/ser-date.component';
export * from './form/date/range/ser-date-range.component';
export * from './form/date/ser-date.module';

// Filter
export * from './form/filter/ser-filter.interface';
export * from './form/filter/ser-filter.component';
export * from './form/filter/ser-filter.module';

// PIN
export * from './form/pin/pin-input.component';

// Address
export * from './form/address/address-col/address-col.component';

// Number
export * from './form/input-number/input-number.component';

// Mask
export * from './form/mask/config';
export * from './form/mask/custom-keyboard-event';
export * from './form/mask/mask-applier.service';
export * from './form/mask/mask.directive';
export * from './form/mask/mask.pipe';
export * from './form/mask/mask.service';
export * from './form/mask/ser-mask.module';

// UI
export * from './ui/when-scrolled.directive';
export * from './ui/bg-image.directive';
export * from './ui/long-press.directive';
export * from './ui/finish-typing.directive';
export * from './ui/copy-to-clipboard.directive';
export * from './ui/download.service';
export * from './ui/snackbar.service';
export * from './ui/toggle-class.directive';
export * from './ui/date.pipe';
export * from './ui/currency.pipe';
export * from './ui/filter.pipe';
export * from './ui/abstract-2-fc.pipe';
export * from './ui/abstract-2-fg.pipe';
export * from './ui/abstract-2-fa.pipe';
export * from './ui/highlighted-text.pipe';
export * from './ui/safe.pipe';
export * from './ui/ser-ui.module';

// Splide
export * from './splide/splide-slide.component';
export * from './splide/splide.component';
export * from './splide/splide.module';
