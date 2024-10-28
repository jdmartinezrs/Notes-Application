import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SaveDialog from '../components/SaveDialog'; // Asegúrate de importar el SaveDialog

const CreateNotes = () => {
    const location = useLocation();
    const note = location.state?.note || {};

    const [title, setTitle] = useState(note.title || '');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showSaveDialog, setShowSaveDialog] = useState(false);

    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const handleSaveClick = () => {
        if (title.trim() === '' || content.trim() === '') {
            setError('Title and content cannot be empty.');
            return;
        }
        setShowSaveDialog(true); // Muestra el diálogo de confirmación
    };

    const handleConfirmSave = async () => {
        setError('');
        setIsSaving(true);
        setShowSaveDialog(false); // Cierra el diálogo

        try {
            const response = await fetch('http://localhost:3000/note/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server error: Expected JSON response but got " + contentType);
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to save note');
            }

            console.log('Note saved successfully:', data);
            setTitle('');
            setContent('');

        } catch (error) {
            console.error('Error saving note:', error);
            setError(error.message || 'Failed to connect to the server. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancelSave = () => {
        setShowSaveDialog(false); // Cierra el diálogo sin guardar
    };

    return (
        <>
            <div className='flex justify-between mt-standar p-5'>
                <div className='bg-input-1 p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[55px]'>
                    <img src="/img/chevron_left.png" alt="Back" className='w-3 h-5' />
                </div>
                <div className='flex gap-4'>
                    <div className='bg-input-1 p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[55px]'>
                        <img src="/img/visibility.png" alt="Preview" className='w-7 h-5' />
                    </div>
                    <button 
                        className='bg-input-1 p-3 rounded-[15px] flex items-center justify-center h-[55px] w-[55px] disabled:opacity-50'
                        onClick={handleSaveClick}
                        disabled={isSaving}
                    >
                        <img src="/img/save.png" alt="Save" className='w-6 h-6' />
                    </button>
                </div>
            </div>

            <div className="min-h-[400px] w-full max-w-2xl mx-auto rounded-lg p-6">
                <textarea
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        autoResize(e);
                    }}
                    onInput={autoResize}
                    placeholder="Title"
                    rows={1}
                    className="w-full bg-transparent text-gray-300 text-4xl font-medium placeholder-gray-500 focus:outline-none mb-4 resize-none overflow-hidden"
                    style={{ minHeight: '60px' }}
                />

                <textarea
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        autoResize(e);
                    }}
                    onInput={autoResize}
                    placeholder="Type something..."
                    className="w-full bg-transparent text-gray-400 text-xl placeholder-gray-500 focus:outline-none resize-none min-h-[200px]"
                />
            </div>

            {error && (
                <div className="p-4 text-center">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {showSaveDialog && (
                <SaveDialog onConfirm={handleConfirmSave} onCancel={handleCancelSave} />
            )}
        </>
    );
};

export default CreateNotes;
