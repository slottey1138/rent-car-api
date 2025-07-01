export interface CreateUserDto {
  username: string;
  phone: string;
  password: string;
  role: string;
}

export interface RegisterDto {
  username: string;
  phone: string;
  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
