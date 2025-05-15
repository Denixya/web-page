export interface FormItem {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  url?: string;
  aboutYou?: string;
  storage: 'session' | 'local';
}
