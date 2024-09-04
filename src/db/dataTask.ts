import { v4 as uuidv4 } from "uuid";

export const DATA_TASK = [
  {
    id: uuidv4(),
    title: "Support tickets list doesn't support commas",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    completed: false,
    deleted: false,
  },
  {
    id: uuidv4(),
    title: "Update user profile page",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry text of the simply dummy",
    completed: true,
    deleted: false,
  },
  {
    id: uuidv4(),
    title: "StrikingDash RTL Update",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry text of the simply dummy",
    completed: false,
    deleted: false,
  },
  {
    id: uuidv4(),
    title: "Registration Confirmation! Email is missing some information",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry text of the simply dummy",
    completed: false,
    deleted: false,
  },
  {
    id: uuidv4(),
    title: "Custom Field for Registration",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry text of the simply dummy",
    completed: true,
    deleted: false,
  },
];

export const DATA_BOARD = [
  {
    id: uuidv4(),
    title: "Selected for dev",
    tasks: [],
  },
  {
    id: uuidv4(),
    title: "Todo",
    tasks: [...DATA_TASK],
  },
  {
    id: uuidv4(),
    title: "Doing",
    tasks: [],
  },
  {
    id: uuidv4(),
    title: "QA",
    tasks: [],
  },
  {
    id: uuidv4(),
    title: "Completed",
    tasks: [],
  },
];
