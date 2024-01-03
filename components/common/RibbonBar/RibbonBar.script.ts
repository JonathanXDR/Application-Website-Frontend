import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
  type Ref,
} from "vue";
import { useI18n } from "vue-i18n";
import Icon from "~/components/common/Icons/Icon.vue";
import LinkCollection from "~/components/common/LinkCollection/LinkCollection.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner/LoadingSpinner.vue";
import { listRepositoryTags } from "~/helpers/github-helper";
import type { CardItemType } from "~/types/common/CardItem";
import type { LinkType } from "~/types/common/Link";
import type { RibbonBar } from "~/types/common/RibbonBar";

export default defineComponent({
  name: "RibbonBar",
  components: {
    LoadingSpinner,
    Icon,
    LinkCollection,
  },
  setup() {
    const { t, tm, rt } = useI18n();
    const tags = ref({ latest: undefined, previous: undefined }) as Ref<{
      latest: string | undefined;
      previous: string | undefined;
    }>;
    const projects: Ref<CardItemType[]> = computed(() =>
      tm("components.containers.projects")
    );
    const technologies: Ref<CardItemType[]> = computed(() =>
      tm("components.containers.technologies")
    );

    const baseItems: Ref<RibbonBar[]> = ref([]);
    const currentIndex = ref(0);
    const totalItems = ref(0);
    const isTransitioning = ref(false);
    const scrollDirection = ref("right");
    const displayItems: Ref<RibbonBar[]> = ref([]);

    const fetchTags = async () => {
      const [latest, previous] = await listRepositoryTags({
        owner: "JonathanXDR",
        repo: "Application-Website-Frontend",
        perPage: 2,
      });

      tags.value = { latest: latest.name, previous: previous.name };
      updateBaseItems();
    };

    const updateBaseItems = () => {
      const items = tm("components.common.RibbonBar") as RibbonBar[];
      baseItems.value = items.map((item, index) => ({
        description:
          item.description &&
          t(`components.common.RibbonBar[${index}].description`, {
            latestTag: tags.value.latest,
            previousTag: tags.value.previous,
            latestProject: projects.value[projects.value.length - 1].title,
            latestTechnology:
              technologies.value[technologies.value.length - 1].title,
          }),
        links:
          item.links &&
          (tm(`components.common.RibbonBar[${index}].links`) as LinkType[]).map(
            (link) => ({
              ...link,
              url: rt(link.url, {
                latestTag: tags.value.latest,
                previousTag: tags.value.previous,
                latestProjectUrl: projects.value[
                  projects.value.length - 1
                ].title
                  ?.toLowerCase()
                  .toLowerCase()
                  .replace(/ /g, "-"),
                latestTechnologyUrl: technologies.value[
                  technologies.value.length - 1
                ].title
                  ?.toLowerCase()
                  .toLowerCase()
                  .replace(/ /g, "-"),
              }),
            })
          ),
      }));
      totalItems.value = baseItems.value.length;

      updateDisplayItems();
    };

    const updateDisplayItems = () => {
      const start =
        (currentIndex.value - 1 + totalItems.value) % totalItems.value;
      displayItems.value = Array.from(
        { length: totalItems.value },
        (_, i) => baseItems.value[(start + i) % totalItems.value]
      );
    };

    const scrollContent = (direction: "left" | "right") => {
      if (!isTransitioning.value && totalItems.value > 2) {
        isTransitioning.value = true;
        scrollDirection.value = direction;

        nextTick(() => {
          if (direction === "left") {
            currentIndex.value =
              currentIndex.value === 0
                ? totalItems.value - 1
                : currentIndex.value - 1;
          } else {
            currentIndex.value = (currentIndex.value + 1) % totalItems.value;
          }
        });
      }
    };

    const transformStyle = computed(() => {
      if (totalItems.value > 2) {
        let translateXValue = -100 / totalItems.value;
        if (scrollDirection.value === "left") {
          translateXValue = Math.abs(translateXValue);
        }

        return {
          transform: `translateX(${
            isTransitioning.value ? translateXValue + "%" : "0px"
          })`,
          width: `${100 * totalItems.value}%`,
          left: "-100%",
          transition: isTransitioning.value
            ? "transform 1000ms ease 0s"
            : "none 0s ease 0s",
        };
      }
      return {};
    });

    watch(currentIndex, () => {
      setTimeout(() => {
        isTransitioning.value = false;
        updateDisplayItems();
      }, 1000);
    });

    watch(tags, () => {
      updateBaseItems();
    });

    onMounted(fetchTags);

    return {
      baseItems,
      totalItems,
      displayItems,
      tags,
      scrollContent,
      transformStyle,
      isTransitioning,
    };
  },
});
