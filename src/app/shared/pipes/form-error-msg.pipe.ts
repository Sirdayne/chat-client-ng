import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'errorMsg',
  pure: false
})
export class FormErrorMsgPipe implements PipeTransform {

  errorMessages = {
    required: 'The :attribute field is required.',
    email: 'The :attribute must be a valid email address.',
    emailTaken: 'The :attribute has already been taken.',
    minlength: 'The :attribute must be at least :minlength characters.',
    min: 'The :attribute min value is :min.',
    max: 'The :attribute max value is :max number.',
    jsonParse: 'The :attribute must be a valid json',
    newUrl: 'The :attribute must be a valid URL',
    containsHttpOrHttps: 'The :attribute must contain http:// or https://',
    mask_errors: {
      phone: 'The :attribute must be a valid phone number.',
      zip: 'The :attribute must be a valid zip.'
    },
    objectRequired: 'Select :attribute from the drop-down list',
    startEndDates: 'End date must be later than Start date',
    matDatepickerMin: 'The :attribute date should be greater or equals today'
  };

  error;
  errorValue;
  control;
  controlName;
  mask;
  customErrorMessages;

  transform(errors, control, mask = null, customErrorMessages = null, customFieldName = null): string {
    if (!errors) {
      return '';
    }

    if (!(control instanceof AbstractControl)) {
      throw new ReferenceError('Specify control when using FormErrorMsgPipe');
    }

    this.error = Object.keys(errors)[0];
    this.errorValue = Object.values(errors)[0];
    this.control = control;
    this.controlName = customFieldName ? customFieldName : this.getControlName();
    this.mask = mask;
    this.customErrorMessages = customErrorMessages;

    return this.getErrorMessage();
  }

  getErrorMessage() {
    try {
      const errorMessageTemplate = !this.mask ? this.getErrorMessageTemplate() : this.getMaskTemplate();

      return this.replaceVariables(errorMessageTemplate);
    } catch (error) {
      // TODO: Implement custom error displaying here
      throw new Error(error);
    }
  }

  getErrorMessageTemplate() {
    if (this.customErrorMessages && this.customErrorMessages[this.error]) {
      return this.customErrorMessages[this.error];
    }

    if (this.errorMessages.hasOwnProperty(this.error)) {
      return this.errorMessages[this.error];
    } else {
      throw new RangeError('No error message for ' + this.error);
    }
  }

  getMaskTemplate() {
    if (this.errorMessages.mask_errors.hasOwnProperty(this.mask)) {
      return this.errorMessages.mask_errors[this.mask];
    } else {
      throw new RangeError('No error message for mask ' + this.mask);
    }
  }

  replaceVariables(errorMessageTemplate) {
    errorMessageTemplate = errorMessageTemplate
      .replace(':attribute', this.controlName)
      .replace('_', ' ');

    if (this.error === 'minlength') {
      errorMessageTemplate = errorMessageTemplate.replace(':minlength', this.errorValue.requiredLength);
    }

    if (this.error === 'min') {
      errorMessageTemplate = errorMessageTemplate.replace(':min', this.errorValue.min);
    }

    if (this.error === 'max') {
      errorMessageTemplate = errorMessageTemplate.replace(':max', this.errorValue.max);
    }

    return errorMessageTemplate;
  }

  getControlName(): string | null {
    const formGroup = this.control.parent.controls;
    return Object.keys(formGroup).find(name => this.control === formGroup[name]) || null;
  }

}
