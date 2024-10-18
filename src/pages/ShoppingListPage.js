import React, { useContext, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ShoppingListContext } from '../context/ShoppingListContext';

const ShoppingListPage = () => {
  const { items, addItem, deleteItem, updateItems, showToastMessage } = useContext(ShoppingListContext);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [addToEnd, setAddToEnd] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
 // Input validation for adding an item to the shopping list
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

  // Add item to the shopping list
  const handleAddItem = (e) => {
    e.preventDefault();
    if (validate()) {
      const newItem = { name, quantity, notes };
      addItem(newItem, addToEnd);
      setName('');
      setQuantity('');
      setNotes('');
      showToastMessage('Item added successfully!', 'success');
    } else {
      showToastMessage('Failed to add item. Please correct the errors.', 'error');
    }
  };
 // Deletes item from the shopping list
  const handleDelete = (index) => {
    deleteItem(index);
    showToastMessage('Item deleted successfully!', 'success');
  };
 // Redirects the user to edit item page
  const handleEditRedirect = (index) => {
    navigate(`/edit/${index}`);
  };

  // Check if the shopping list item was dragged outside the list and if not update the list accordingly
  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    // Update the context with the new order and update local storage with the new order
    updateItems(reorderedItems);
    localStorage.setItem('shoppingList', JSON.stringify(reorderedItems));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-wrap">
        <div className="w-full border-b md:w-1/3 p-4 md:border-r border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Add an Item</h2>
          <form onSubmit={handleAddItem} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}

            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={addToEnd}
                onChange={(e) => setAddToEnd(e.target.checked)}
                className="hidden"
              />
              <div className={`w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center 
                ${addToEnd ? 'bg-blue-500 border-transparent' : ''}`}>
                {addToEnd && <span className="text-white text-xl">✔</span>}
              </div>
              <span className="ml-2 text-gray-700">Add to the end of the list</span>
            </label>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Add item
            </button>
          </form>
        </div>
        <div className="w-full md:w-2/3 p-4">
          <h2 className="text-2xl font-semibold mb-4">Shopping List</h2>
          {items.length === 0 ? (
            <p className="text-gray-500 text-center">Your shopping list is empty. Add some items!</p>
          ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="shoppingList">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {items.map((item, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-100 p-4 rounded-lg shadow-sm sm:flex-1 md:flex md:flex-row justify-between items-center break-words text-pretty"
                        >
                          <div className='w-2/3'>
                            <p className="font-bold">{item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p className="text-sm text-gray-600">{item.notes}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleEditRedirect(index)}>
                              ✏️
                            </button>
                            <button onClick={() => handleDelete(index)}>
                              🗑️
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;