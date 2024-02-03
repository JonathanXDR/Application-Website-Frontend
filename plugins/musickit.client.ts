import { listRepositoryTags } from "~/helpers/github-helper";

export default defineNuxtPlugin((nuxtApp) => {
  const tags = ref({ latest: undefined, previous: undefined }) as Ref<{
    latest: string | undefined;
    previous: string | undefined;
  }>;
  const developerToken = import.meta.env.VITE_APPLE_DEVELOPER_TOKEN;
  const appConfiguration = {
    name: "Application-Website",
    build: tags.value.latest,
    version: tags.value.latest,
    icon: "App Icon URL",
  };

  const fetchTags = async () => {
    const [latest, previous] = await listRepositoryTags({
      owner: "JonathanXDR",
      repo: "Application-Website-Frontend",
      perPage: 2,
    });

    tags.value = { latest: latest.name, previous: previous.name };
  };
});
