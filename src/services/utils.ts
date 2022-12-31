export async function fetchData() {
  try {
    const response = await fetch("src/assets/data/data.json");
    const json = await response.json();
    return json;
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
