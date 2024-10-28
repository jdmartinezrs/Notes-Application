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
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [searchActive, setSearchActive] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:3000/note/notes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setNotes(data);
                setFilteredNotes(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching notes:', error);
                setIsLoading(false);
            });
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
                setFilteredNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));
                console.log(`Note with ID ${noteId} deleted successfully.`);
            } catch (error) {
                console.error('Error deleting note:', error);
                alert('Failed to delete the note. Please try again.');
            }
        }
    };

    const handleSearch = (query) => {
        setIsSearching(query.length > 0);
        if (query) {
            const filtered = notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()));
            setFilteredNotes(filtered);
        } else {
            setFilteredNotes(notes);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return null; // O puedes mostrar un loader si lo prefieres
        }

        if (filteredNotes.length > 0) {
            return filteredNotes.map((note, index) => {
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
                                alt="Delete Icon" 
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
            });
        }

        // Solo mostrar la imagen y mensaje cuando no hay resultados de búsqueda
        if (isSearching) {
            return (
                <div className='flex flex-col items-center justify-center w-full absolute top-1/2 transform -translate-y-1/2'>
                    <img 
                        src="/img/cuate.png" 
                        alt="No results found" 
                        className='w-50 h-60 mb-4 opacity-80'
                    />
                    <p className='text-gray-400 text-lg mt-4'>
                        No matching notes found
                    </p>
                </div>
            );
        }

        // Si no estamos buscando y no hay notas, no mostrar nada
        return null;
    };

    return (
        <>
            <div className='flex justify-between mt-standar p-5'>
                <h1 className={`text-medio text-color-1 ${searchActive ? 'hidden' : ''}`}>Notes</h1>
                <div className='flex gap-4'>
                    {searchActive ? (
                        <SearchInput onSearch={handleSearch} onClose={() => {
                            setSearchActive(false);
                            setIsSearching(false);
                            setFilteredNotes(notes);
                        }} />
                    ) : (
                        <>
                            <div className='bg-input-1 p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[55px] cursor-pointer' onClick={() => setSearchActive(true)}>
                                <img src="/img/search.png" alt="Search Icon" className='w-5 h-5' />
                            </div>
                            <div className='bg-input-1 p-3 rounded-[15px] flex items-center justify-center h-[55px] w-[55px]'>
                                <img src="/public/img/info_outline.png" alt="Info Icon" className='w-6 h-6' />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className='flex flex-wrap justify-center gap-y-4 min-h-[60vh] relative'>
                {renderContent()}
            </div>

            <div className='fixed bottom-20 right-4'> 
                <div 
                    className='bg-input-1 p-3 rounded-[50px] flex items-center justify-center h-[55px] w-[55px] cursor-pointer hover:bg-opacity-90 transition-all' 
                    style={{ boxShadow: '-2px 2px 5px var(--color-4)' }} 
                    onClick={addNote}
                >
                    <img src="/img/add.png" alt="Add Note" className='w-5 h-5' />
                </div>
            </div>
        </>
    );
};

export default CreateFirstNote;