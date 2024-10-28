import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InsideNotes = () => {
    const { id } = useParams(); // Obtain the ID from the URL
    const navigate = useNavigate();
    const [note, setNote] = useState(null); // Use a single note instead of an array
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            if (!id) {
                setError('No ID provided');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:3000/note/notes/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Data received:', data);
                setNote(data); // Set the single note data
            } catch (error) {
                console.error('Error details:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNote();
    }, [id]); // Now the effect runs when the ID changes

    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    if (isLoading) {
        return <div className="text-center text-gray-400">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!note) {
        return <p className="text-center text-gray-400">No note available</p>; // Handle case if no note is found
    }

    return (
        <>
            <div className='flex justify-between mt-standar p-5'>
                <div 
                    className='bg-input-1 p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[55px] cursor-pointer'
                    onClick={handleGoBack}
                >
                    <img src="/img/chevron_left.png" alt="Back Icon" className='w-3 h-5' />
                </div>
                <div className='bg-input-1 p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[55px]'>
                    <img src="/img/mode.png" alt="Edit Icon" className='w-5 h-5' />
                </div>
            </div>

            <div className="min-h-[400px] w-full max-w-2xl mx-auto rounded-lg p-6">
                <textarea
                    value={note.title || ''}
                    onChange={(e) => {
                        setNote(prev => ({ ...prev, title: e.target.value })); // Update title in note object
                        autoResize(e);
                    }}
                    onInput={autoResize}
                    placeholder="Title"
                    rows={1}
                    className="w-full bg-transparent text-gray-300 text-4xl font-medium placeholder-gray-500 focus:outline-none mb-4 resize-none overflow-hidden"
                    style={{ minHeight: '60px' }}
                />
                <textarea
                    value={note.content || ''}
                    onChange={(e) => {
                        setNote(prev => ({ ...prev, content: e.target.value })); // Update content in note object
                        autoResize(e);
                    }}
                    onInput={autoResize}
                    placeholder="Type something..."
                    className="w-full bg-transparent text-gray-400 text-xl placeholder-gray-500 focus:outline-none resize-none min-h-[200px]"
                />
            </div>
        </>
    );
};

export default InsideNotes;
