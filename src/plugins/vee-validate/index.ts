import { configure, defineRule, ErrorMessage, Field, FieldArray, Form } from "vee-validate";
import { confirmed, email, max, min, regex, required } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
// import { DICTIONARY } from "@/plugins/vee-validate/dictionary";
import type { App } from "vue";
import en from "@vee-validate/i18n/dist/locale/en.json";
import ja from "@vee-validate/i18n/dist/locale/ja.json";

// Define the rule
defineRule("required", required);
defineRule("regex", regex);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("required_custom", required);
defineRule("confirmed", confirmed);

defineRule("password", (value: string) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }

  // Check if pass, email
  if (!/^(?=.{7,})[a-zA-Z0-9!@#$%^*+_-]*$/.test(value)) {
    return false;
  }

  return true;
});

defineRule("email_format", (value: string) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }

  // Check if email
  if (
    !/^[a-zA-Z0-9]{1}[a-zA-Z0-9_.-]+@{1}[a-zA-Z0-9_-]{1,}(?:\.[a-zA-Z0-9_-]+)*(?:\.(?!cf|gq|ml|tk|ga)[a-zA-Z0-9_-]+)$/.test(
      value
    )
  ) {
    return false;
  }

  return true;
});

defineRule("special_characters", (value: string) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }

  // Check if email
  /* eslint-disable-next-line */
  if (!/^[^\;\<\=\>\/\[\]\{\|\}\\￥]+$/.test(value)) {
    return false;
  }

  return true;
});

defineRule("number_text_latin_lowercase", (value: string) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }

  /* eslint-disable-next-line */
  return /^[a-z0-9-]+$/.test(value);
});

defineRule("block_class", (value: string) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }

  /* eslint-disable-next-line */
  return /^[a-z0-9-\ ]+$/.test(value);
});

defineRule("color_codes", (value: string) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }

  /* eslint-disable-next-line */
  return /^#[0-9A-Fa-f]{3,8}$/.test(value);
});

configure({
  validateOnInput: true,
  validateOnChange: true,
  validateOnBlur: true,
  validateOnModelUpdate: true,
  generateMessage: localize({
    en: {
      messages: {
        ...en.messages,
      },
    },
    ja: {
      messages: {
        ...ja.messages,
      },
    },
  }),
});

export function libVeeValidate(app: App) {
  app.component("VeeForm", Form);
  app.component("VeeField", Field);
  app.component("VeeFieldArray", FieldArray);
  app.component("VeeErrorMessage", ErrorMessage);
}
