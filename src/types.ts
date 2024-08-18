export interface InputsData {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  termsAccepted?: NonNullable<boolean | undefined>;
  country?: string;
  image?: string | File[];
}
