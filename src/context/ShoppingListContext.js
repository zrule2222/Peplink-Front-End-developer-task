import { createContext, useState } from 'react';
import Toast from '../components/Toast';

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem('shoppingList')) || [];
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  let toastTimeoutId = null; // Variable to hold the timeout ID

  // Add shopping list item to LocalStorage
  const addItem = (item, addToEnd) => {
    const newItems = addToEnd ? [...items, item] : [item, ...items];
    setItems(newItems);
    localStorage.setItem('shoppingList', JSON.stringify(newItems));
    showToastMessage('Item added successfully', 'success');
  };

  // Update shopping list item in the LocalStorage
  const updateItem = (index, updatedItem) => {
    const updatedItems = items.map((item, i) => (i == index ? updatedItem : item));
    setItems(updatedItems);
    localStorage.setItem('shoppingList', JSON.stringify(updatedItems));
    showToastMessage('Item updated successfully', 'success');
  };

  // Deletes shopping list item from LocalStorage
  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    localStorage.setItem('shoppingList', JSON.stringify(updatedItems));
    showToastMessage('Item deleted successfully', 'success');
  };

  const updateItems = (newItems) => {
    setItems(newItems);
  };

  // Show toast message after CRUD actions on the shopping list
  const showToastMessage = (message, type) => {
    // Clear the existing toast timeout if it's set
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }

    // Set the new message and type
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    // Set a new timeout to hide the toast after 3 seconds
    toastTimeoutId = setTimeout(() => {
      setShowToast(false);
      setToastMessage(''); // Clear the message after hiding
    }, 3000);
  };

  return (
    <ShoppingListContext.Provider
      value={{ items, addItem, updateItem, deleteItem, updateItems,showToastMessage }}
    >
      {children}
      {showToast && <Toast message={toastMessage} type={toastType} />}
    </ShoppingListContext.Provider>
  );
};
