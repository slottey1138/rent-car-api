export interface CreateUserDto {
  username: string;
  phone: string;
  password: string;
  role: string;
  cretedBy: number;
  updatedBy: number;
}

export interface RegisterDto {
  username: string;
  phone: string;
  password: string;
  role: string;
  createdBy: number;
  updatedBy: number;
}

export interface LoginDto {
  username: string;
  password: string;
}
