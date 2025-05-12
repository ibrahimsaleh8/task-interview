export type UserLoginDataType = {
  email: string;
  password: string;
};
export type UserRegisterDataType = {
  name: string;
  email: string;
  password: string;
};
export type userPayloadDataType = {
  name: string;
  email: string;
  userId: number;
};
export type axiosErrorType = { response: { data: { message: string } } };

export type TaskDataType = {
  title: string;
  description: string;
};
export type TasksDataInfoType = {
  id: string;
  title: string;
  description: string;
  updated_at: string;
  created_at: string;
};
