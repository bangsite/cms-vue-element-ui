import { ref } from "vue";
import type { BlockFormMap, BlockType } from "@/types";
import { useI18n } from "vue-i18n";

const blockTypes: BlockType[] = [
  { icon: "fluent:button-16-regular", type: "button", nameKey: "BLOCK_BTN", status: true },
  { icon: "f7:photo-on-rectangle", type: "image", nameKey: "BLOCK_IMG", status: true },
  { icon: "oui:editor-code-block", type: "html", nameKey: "BLOCK_HTML", status: true },
  { icon: "bi:card-heading", type: "heading", nameKey: "BLOCK_HEADING", status: false },
  { icon: "ph:list-star-light", type: "review", nameKey: "BLOCK_REVIEW", status: false },
  { icon: "fluent:people-team-16-regular", type: "team", nameKey: "BLOCK_TEAM", status: false },
];

export default function useBuilderBlock() {
  const { t } = useI18n();

  const listBlockTypes = ref<BlockType[] | null>(blockTypes);
  const dataBlockForm = ref<BlockFormMap | null>(null);

  const mapBlockTypes = (blockType: BlockType) => {
    const { type, nameKey } = blockType;

    switch (type) {
      case "button":
        dataBlockForm.value = {
          title: t(`BLOCK.${nameKey}`),
          type: type,
          id: "",
          class: "",
          backgroundColor: "",
        };
        break;
      case "image":
        dataBlockForm.value = {
          title: t(`BLOCK.${nameKey}`),
          type: type,
          id: "",
          class: "",
          backgroundColor: "",
        };
        break;
      case "html":
        dataBlockForm.value = {
          title: t(`BLOCK.${nameKey}`),
          type: type,
          id: "",
          class: "",
          backgroundColor: "",
        };
        break;
      default:
        throw new Error("Invalid block type");
    }
  };

  return {
    mapBlockTypes,
    listBlockTypes,
    dataBlockForm,
  };
}
