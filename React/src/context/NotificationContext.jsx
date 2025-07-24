import { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null); // { message, type }

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
  }, []);

  const value = {
    notification,
    showNotification,
    hideNotification: () => setNotification(null),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
