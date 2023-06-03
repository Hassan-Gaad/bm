import { FormControl } from '@angular/forms';

export class NumbersOnlyFormControl extends FormControl {
  override setValue(
    value: string | null,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    }
  ): void {
    if (!value) {
      super.setValue('', { ...options, emitModelToViewChange: true });
      return;
    }
    if (!/^[0-9]+$/.test(value?.toString())) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }
    super.setValue(value, { ...options, emitModelToViewChange: true });
  }
}
