export interface Update {
  username?: string;
  password?: string;
  phone?: string;
  birth?: string;
  error?: string;
}

export interface UpdateState {
  username: string;
  password: string;
  phone: string;
  birth: string;
}
