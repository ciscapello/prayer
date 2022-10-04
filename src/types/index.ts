export interface Column {
  id: number;
  title: string;
  description: null | string;
  userId: number;
}

export interface Prayer {
  id: number;
  title: string;
  description: string;
  checked: boolean;
  columnId: number;
  commentsIds: [];
}
