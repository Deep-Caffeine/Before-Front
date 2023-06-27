export interface UserCreate {
  email: string;
  password: string;
  username: string;
  phone: string;
  birth: string;
};

export interface UserCreateResponseDto {
  error?: string;
  email?: boolean;
  password?: boolean;
  username?: boolean;
  phone?: boolean;
  birth?: boolean;
}