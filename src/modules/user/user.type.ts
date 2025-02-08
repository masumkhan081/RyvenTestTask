// Define interfaces for expected inputs
export interface RegisterData {
    fullName: string;
    phone: string;
    gender: string;
    address: string;
    email: string;
    password: string;
    role: string;
  }
  
  export interface VerifyEmailData {
    token: string;
    otp: string;
    email: string;
  }
  
  // interface LoginData {
  //   email: string;
  //   password: string;
  // }
  
  export interface UpdatePasswordData {
    email: string;
    password: string;
  }