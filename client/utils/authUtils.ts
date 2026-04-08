// Authentication utilities for mock authentication

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  location?: string;
  pincode?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  location?: string;
  pincode?: string;
}

const STORAGE_KEY = "authUser";
const USERS_STORAGE_KEY = "appUsers";

// Initialize with some demo users
const initializeDemoUsers = () => {
  const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (!existingUsers) {
    const demoUsers: Record<string, { password: string; user: AuthUser }> = {
      "demo@example.com": {
        password: "demo123",
        user: {
          id: "1",
          name: "Demo User",
          email: "demo@example.com",
          location: "Bangalore",
          pincode: "560001",
          createdAt: new Date().toISOString(),
        },
      },
    };
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(demoUsers));
  }
};

initializeDemoUsers();

export const login = async (
  credentials: LoginCredentials,
): Promise<AuthUser> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const usersData = localStorage.getItem(USERS_STORAGE_KEY);
  if (!usersData) {
    throw new Error("Invalid credentials");
  }

  const users = JSON.parse(usersData) as Record<
    string,
    { password: string; user: AuthUser }
  >;
  const userData = users[credentials.email];

  if (!userData || userData.password !== credentials.password) {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData.user));
  return userData.user;
};

export const signup = async (data: SignupData): Promise<AuthUser> => {
  // Validate input
  if (data.password !== data.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (data.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (!data.email.includes("@")) {
    throw new Error("Invalid email address");
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const usersData = localStorage.getItem(USERS_STORAGE_KEY);
  const users = usersData
    ? (JSON.parse(usersData) as Record<
        string,
        { password: string; user: AuthUser }
      >)
    : {};

  if (users[data.email]) {
    throw new Error("Email already registered");
  }

  const newUser: AuthUser = {
    id: Math.random().toString(36).substr(2, 9),
    name: data.name,
    email: data.email,
    location: data.location,
    pincode: data.pincode,
    createdAt: new Date().toISOString(),
  };

  users[data.email] = {
    password: data.password,
    user: newUser,
  };

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

  return newUser;
};

export const getCurrentUser = (): AuthUser | null => {
  const userStr = localStorage.getItem(STORAGE_KEY);
  if (!userStr) return null;
  return JSON.parse(userStr) as AuthUser;
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const updateUserLocation = (
  location: string,
  pincode?: string,
): AuthUser => {
  const user = getCurrentUser();
  if (!user) throw new Error("User not authenticated");

  const updatedUser: AuthUser = {
    ...user,
    location,
    pincode,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));

  // Update in users database too
  const usersData = localStorage.getItem(USERS_STORAGE_KEY);
  if (usersData) {
    const users = JSON.parse(usersData) as Record<
      string,
      { password: string; user: AuthUser }
    >;
    if (users[user.email]) {
      users[user.email].user = updatedUser;
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
  }

  return updatedUser;
};
