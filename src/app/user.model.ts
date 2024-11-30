export interface User {
  id: string;
  username: string;
  password: string;
  type: 'Admin' | 'User';  // Add user roles here
  token: string;  // Store the authentication token
}
