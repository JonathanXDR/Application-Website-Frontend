export async function fetchData() {
  try {
    const response = await fetch("src/assets/data/data.json");
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error: any) {
    console.error("Utils", new Error(error));
    return {};
  }
}
