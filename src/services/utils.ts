export async function fetchData() {
  try {
    const response = await fetch('src/assets/data/data.json');
    const json = await response.json();
    return json;
  } catch (error: any) {
    console.error('Utils', new Error(error));
    return {};
  }
}

export function stringTemplateParser(expression: object, object: any) {
  const templateMatcher =
    /{{\s?([a-zA-Z0-9]*)(\[\d+\])?\s?([/+\-*]\s?\d+)?\s?}}/g;
  const description = JSON.stringify(expression).replace(
    templateMatcher,
    (substring: string, ...args: any[]) => {
      const [key, index, operation] = args;
      let value = object[key];
      if (index) {
        value = value[index.replace(/\[|\]/g, '')];
      }
      if (operation) {
        value = eval(`${value} ${operation}`);
      }
      return value;
    }
  );
  return JSON.parse(description);
}
