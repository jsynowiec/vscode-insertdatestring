// ambient module declaration for https://www.npmjs.com/package/date-format-lite
declare module "date-format-lite" {}

// date-format-lite augments built-in Date
interface Date {
  format: (format?: string) => string;
  masks: { default: string };
}
