import variables from "@/assets/scss/settings/_variable.module.scss";

const useDesign = () => {
    const scssVariables = variables;
    const getPrefixCls = (scope: string) => {
        return `${scssVariables.namespace}-${scope}`;
    };

    return {
        variables: scssVariables,
        getPrefixCls,
    };
};

export { useDesign };
