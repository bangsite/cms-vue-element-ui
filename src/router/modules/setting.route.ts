import AccountSetting from "@/views/account/AccountSetting.vue";

export const setting = [
    {
        path: "/account",
        name: "account",
        children: [
            {
                path: "setting",
                name: "account-setting",
                component: () => AccountSetting,
            },
        ],
    },
];
