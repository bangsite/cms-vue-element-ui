import { reactive, toRefs } from "vue";
import { useBuilderLayoutStore } from "@/stores/builderLayout.store";
import { useDialogStore } from "@/stores/dialog.store";
import { BLOCK_FORM, BLOCK_TYPES, SECTION_DEFAULT } from "@/config/enums/builderLayout.enum";

export const useBuilderLayout = () => {
  const { setTitle, setLayoutName, setActive } = useDialogStore();

  const { sections, addSection, addBlock, setBlockTypes, setSectionIndex, setSectionName } = useBuilderLayoutStore();
  const state = reactive({
    sectionName: "",
    setBlockAt: 0,
  });

  const initBlockTypes = () => {
    setBlockTypes(BLOCK_TYPES.get("default"));
  };

  const initSection = () => {
    addSection(SECTION_DEFAULT);
  };

  const initBlock = () => {
    addBlock(0, BLOCK_FORM.get("button"));
  };

  const addNewSection = () => {
    const section = { name: `Section ${sections.length + 1}` };

    // add section into store
    addSection(section);
  };

  const addBlockTypes = (sectionIndex: number, sectionName: string) => {
    // show dialog render Block Types
    setActive(true);
    setTitle("Block Types UI");
    setLayoutName("BlockTypes");

    // show modal block types & set index section
    setSectionIndex(sectionIndex);
    setSectionName(sectionName);

    // state.isModalBuilder = true;
    // state.sectionName = sectionName;
    // state.setBlockAt = +sectionIndex;
  };

  return {
    ...toRefs(state),
    initBlockTypes,
    initSection,
    initBlock,
    addNewSection,
    addBlockTypes,
  };
};
