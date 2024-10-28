// SaveDialog.jsx
import React from 'react';

const SaveDialog = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold">¿Deseas guardar los cambios?</h2>
                <div className="mt-4 flex justify-end">
                    <button 
                        onClick={onCancel} 
                        className="mr-4 px-4 py-2 bg-gray-300 rounded"
                    >
                        Descartar
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveDialog;
