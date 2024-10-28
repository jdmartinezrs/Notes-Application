import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SaveDialog from '../components/SaveDialog';
import SearchInput from '../components/SearchInput';

const cardColors = [
    'var(--card-1)',
    'var(--card-2)',
    'var(--card-3)',
    'var(--card-4)',
    'var(--card-5)',
    'var(--card-6)',
];

const CreateFirstNote = () => {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]); // Para mantener las notas filtradas
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [searchActive, setSearchActive] = useState(false); // Para saber si el campo de búsqueda está activo
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/note/notes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setNotes(data);
                setFilteredNotes(data); // Inicialmente, todas las notas son filtradas
            })
            .catch(error => console.error('Error fetching notes:', error));
    }, []);

    const addNote = () => {
        const newNote = {
            title: `New Note ${notes.length + 1}`,
        };
        navigate('/CreateNotes', { state: { note: newNote } });
    };

    const handleMouseEnter = (index) => {
        const timeout = setTimeout(() => {
            setHoveredIndex(index);
        }, 300);
        setHoverTimeout(timeout);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        setHoveredIndex(null);
    };

    const handleNoteClick = (noteId) => {
        navigate(`/InsideNotes/${noteId}`);
    };

    const handleDeleteNote = async (noteId) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                const response = await fetch(`http://localhost:3000/note/notes/${noteId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete note');
                }

                setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));
                setFilteredNotes(prevNotes => prevNotes.filter(note => note._id !== noteId)); // Actualizar las notas filtradas
                console.log(`Note with ID ${noteId} deleted successfully.`);
            } catch (error) {
                console.error('Error deleting note:', error);
                alert('Failed to delete the note. Please try again.');
            }
        }
    };

    const handleSearch = (query) => {
        if (query) {
            const filtered = notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()));
            setFilteredNotes(filtered);
        } else {
            setFilteredNotes(notes); // Si no hay consulta, mostrar todas las notas
        }
    };

    return (
        <>
            <div className='flex justify-between mt-standar p-5'>
                <h1 className={`text-medio text-color-1 ${searchActive ? 'hidden' : ''}`}>Notes</h1>
                <div className='flex gap-4'>
                    {searchActive ? (
                        <SearchInput onSearch={handleSearch} onClose={() => setSearchActive(false)} />
                    ) : (
                        <>
                            <div className='bg-input-1 p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[55px]' onClick={() => setSearchActive(true)}>
                                <img src="/img/search.png" alt="Ícono" className='w-5 h-5' />
                            </div>
                            <div className='bg-input-1 p-3 rounded-[15px] flex items-center justify-center h-[55px] w-[55px]'>
                                <img src="/public/img/info_outline.png" alt="Ícono" className='w-6 h-6' />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className='flex flex-wrap justify-center gap-y-4'>
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note, index) => {
                        const colorIndex = index % cardColors.length;
                        const isHovered = hoveredIndex === index;

                        const noteStyle = {
                            backgroundColor: isHovered ? 'var(--button-2)' : cardColors[colorIndex],
                            transition: 'all 0.3s ease-in-out',
                        };

                        return (
                            <div
                                key={note._id}
                                className='h-[100px] w-[350px] rounded-[10px] flex justify-center items-center mx-2 cursor-pointer'
                                style={noteStyle}
                                onClick={() => handleNoteClick(note._id)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {isHovered ? (
                                    <img 
                                        src="/img/delete.png" 
                                        alt="Ícono" 
                                        className='w-5 h-5'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteNote(note._id);
                                        }} 
                                    />
                                ) : (
                                    <p className='transition-opacity duration-300 ease-in-out'>{note.title}</p>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>No notes available</p>
                )}
            </div>

            <div className='fixed bottom-20 right-4'> 
                <div 
                    className='bg-input-1 p-3 rounded-[50px] flex items-center justify-center h-[55px] w-[55px]' 
                    style={{ boxShadow: '-2px 2px 5px var(--color-4)' }} 
                    onClick={addNote}
                >
                    <img src="/img/add.png" alt="Ícono" className='w-5 h-5' />
                </div>
            </div>
        </>
    );
};

export default CreateFirstNote;
