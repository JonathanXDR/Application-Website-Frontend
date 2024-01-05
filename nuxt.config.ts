// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Discover the work of Jonathan Russ and learn more about him, including his projects at Swisscom.",
        },
      ],
      script:
        process.env.NODE_ENV === "production"
          ? []
          : [
              {
                src: "https://snippet.meticulous.ai/v1/meticulous.js",
                ["data-project-id"]: "3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w",
                ["data-is-production-environment"]: false,
              },
            ],
      title: "Jonathan Russ",
    },
  },
  components: {
    dirs: [
      {
        path: "~/components/containers",
        global: true,
      },
      "~/components/common",
    ],
  },
});
