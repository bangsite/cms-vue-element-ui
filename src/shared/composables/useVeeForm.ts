import { type FormContext, type FormOptions, useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { watch } from "vue";

/* A way to create a generic function. */
const parent = {
  useTranslateForm<TValues extends Record<string, any> = Record<string, any>>(
    opts?: FormOptions<TValues>
  ): FormContext<TValues> {
    const i18n = useI18n();

    const formContext = useForm<TValues>(opts);
    watch(i18n.locale, (val) => {
      const errorsField = formContext.errors.value;
      const errors = Object.keys(errorsField);
      errors.forEach((error) => {
        formContext.validateField(error);
      });
    });
    return formContext;
  },
};
export default parent.useTranslateForm;
