import { ref } from 'vue'

export default function useSorter(){
    const sortedInfo = ref();

    const setAgeSort = () => {
        sortedInfo.value = {
            order: "descend",
            columnKey: "age",
        };
    };

    return{
        sortedInfo,
        setAgeSort
    }
}
