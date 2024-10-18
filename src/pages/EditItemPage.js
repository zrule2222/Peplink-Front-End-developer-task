import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingListContext } from '../context/ShoppingListContext';

const EditItemPage = () => {
  // Get item index from URL
  const { index } = useParams();
  const navigate = useNavigate();
  const { items, updateItem, showToastMessage } = useContext(ShoppingListContext);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch the item data when the component mounts
  useEffect(() => {
    const item = items[index];
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setNotes(item.notes);
    }
  }, [index, items]);
 // Input validation for editing a shopping list item
  const validate = () => {
    let newErrors = {};
    if (!name) newErrors.name = 'Name is required';
        if (!quantity || isNaN(quantity)){ 
      newErrors.quantity = 'Quantity is required'
    }else if(quantity <= 0){
newErrors.quantity = 'Quantity must be more then 0'
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 // Updates the shopping list item with new data or shows an error message if the update fails
  const handleUpdate = (e) => {
    e.preventDefault();
    if (validate()) {
      const updatedItem = { name, quantity, notes };
      updateItem(index, updatedItem);
      navigate('/');
    } else {
      showToastMessage('Failed to update item. Please correct the errors.', 'error');
    }
  };
 // Navigate back to the shopping list page if the "Back" button is clicked
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Edit Item</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />

        <div className="flex justify-between">
          <button type="button" onClick={handleBack} className="bg-gray-500 text-white p-2 rounded">
            Back
          </button>
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItemPage;
