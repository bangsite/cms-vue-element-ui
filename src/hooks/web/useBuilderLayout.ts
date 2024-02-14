import { reactive, toRefs } from "vue";
import { useBuilderLayoutStore } from "@/stores/builderLayout.store";
import { useDialogStore } from "@/stores/dialog.store";

export const useBuilderLayout = () => {
  const { setTitle, setLayoutName, setActive } = useDialogStore();

  const { setSectionIndex, setSectionName } = useBuilderLayoutStore();
  const state = reactive({
    sectionName: "",
    setBlockAt: 0,
  });

  const addBlockTypes = (sectionIndex: number, sectionName: string) => {
    // show dialog render Block Types
    setActive(true);
    setTitle("Block Types UI");
    setLayoutName("BlockTypes");

    // show modal block types & set index section
    setSectionIndex(+sectionIndex);
    setSectionName(sectionName);
    // state.isModalBuilder = true;
    // state.sectionName = sectionName;
    // state.setBlockAt = +sectionIndex;
  };

  return {
    ...toRefs(state),
    addBlockTypes,
  };
};
