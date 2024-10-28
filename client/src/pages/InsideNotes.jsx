import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SaveDialog from '../components/SaveDialog'; // Asegúrate de importar SaveDialog

const InsideNotes = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const navigate = useNavigate();
    const [note, setNote] = useState(null); // Usar una única nota en lugar de un array
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false); // Estado para mostrar el diálogo

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
                setNote(data); // Establecer los datos de la nota
            } catch (error) {
                console.error('Error details:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleGoBack = () => {
        navigate(-1); // Regresar a la página anterior
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3000/note/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: note.title,
                    content: note.content,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Note updated:', data);
            setShowDialog(false);
        } catch (error) {
            console.error('Error updating note:', error);
            setError(`Error updating note: ${error.message}`);
        }
    };

    if (isLoading) {
        return <div className="text-center text-gray-400">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!note) {
        return <p className="text-center text-gray-400">No note available</p>; // Manejar el caso si no se encuentra la nota
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
                <div 
                    className='bg-input-1 p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[55px]' 
                    onClick={() => setShowDialog(true)} // Muestra el diálogo al hacer clic
                >
                    <img src="/img/mode.png" alt="Edit Icon" className='w-5 h-5' />
                </div>
            </div>

            <div className="min-h-[400px] w-full max-w-2xl mx-auto rounded-lg p-6">
                <textarea
                    value={note.title || ''}
                    onChange={(e) => {
                        setNote(prev => ({ ...prev, title: e.target.value })); // Actualiza el título en el objeto note
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
                        setNote(prev => ({ ...prev, content: e.target.value })); // Actualiza el contenido en el objeto note
                        autoResize(e);
                    }}
                    onInput={autoResize}
                    placeholder="Type something..."
                    className="w-full bg-transparent text-gray-400 text-xl placeholder-gray-500 focus:outline-none resize-none min-h-[200px]"
                />
            </div>

            {showDialog && (
                <SaveDialog 
                    onConfirm={() => { handleSave(); setShowDialog(false); }} // Llama a handleSave y cierra el diálogo
                    onCancel={() => setShowDialog(false)} // Cierra el diálogo al cancelar
                />
            )}
        </>
    );
};

export default InsideNotes;
