import i18n from "@/main";

export async function fetchData(path: string) {
  try {
    const locale = i18n.global.locale;

    console.log("Utils", locale);

    const response = await fetch(`src/assets/lang/${locale}.json`);
    const json = await response.json();
    return json.path;
  } catch (error: unknown) {
    console.error("Utils", new Error(error as string));
    return {};
  }
}

export function stringTemplateParser(
  expression: object,
  object: { [key: string]: any }
) {
  const templateMatcher =
    /{{\s?([a-zA-Z0-9]*)(\[\d+\])?\s?([/+\-*]\s?\d+)?\s?}}/g;
  const description = JSON.stringify(expression).replace(
    templateMatcher,
    (substring: string, ...args: [string, string | undefined, undefined]) => {
      const [key, index, operation] = args;
      let value = object[key];
      if (index) {
        value = value[index.replace(/\[|\]/g, "")];
      }
      if (operation) {
        value = eval(`${value} ${operation}`);
      }
      return value;
    }
  );
  return JSON.parse(description);
}
