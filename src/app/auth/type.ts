export type authFormType = {
  toggleAUthForm: () => void;
};

export type AuthFormErrors = {
  username?: string[];
  password?: string[];
  confirmPassword?: string[];
};

export type AuthFormState = {
  errors?: AuthFormErrors;
  values?: {
    username: string;
    password: string;
    confirmPassword?: string;
  };
  user?: { id: string; username: string };
};
