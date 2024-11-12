type ID = string;

export interface Board {
  id: ID;
  title: string;
  tasks: Tasks[];
  deleted?: boolean;
}

export interface Tasks {
  id: ID;
  title?: string;
  description?: string;
  completed?: boolean;
  deleted?: boolean;
  createdAt?: Date;
}

export interface TaskFormProps {
  columns: any[];
  data: { [key: string]: any };
  edit?: boolean;
  labelPosition?: string;
  title?: string;
  selectData?: any[];
}
