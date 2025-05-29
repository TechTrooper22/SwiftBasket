import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // In a real app, this would be an API call to a backend server
  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock login logic (in a real app, this would verify credentials with a backend)
    if (email === 'user@example.com' && password === 'password') {
      const user = {
        id: '123',
        name: 'John Doe',
        email: 'user@example.com',
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const register = async (name, email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration logic
    const user = {
      id: Date.now().toString(),
      name,
      email,
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};