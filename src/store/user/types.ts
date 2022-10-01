export interface SignUpResponse {
  id: number;
  email: string;
  name: string;
  token: string;
  password: string;
  columns: Column[];
}

export interface Column {
  title: string;
  description: string | null;
  id: number;
  userId?: number;
}

export interface SignInResponse {
  id: number;
  email: string;
  name: string;
  token: string;
}
