import React, { useState, useEffect } from 'react';

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
    const [hoveredIndex, setHoveredIndex] = useState(null); // Agregar estado para el índice de hover

    useEffect(() => {
        fetch('http://localhost:3000/note/notes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setNotes(data))
            .catch(error => console.error('Error fetching notes:', error));
    }, []);

    const addNote = () => {
        const newNote = {
            title: `New Note ${notes.length + 1}`,
        };

        // Actualiza el estado para incluir la nueva nota
        setNotes(prevNotes => [...prevNotes, newNote]);
    };

    const handleMouseEnter = (index) => {
        const timeout = setTimeout(() => {
            setHoveredIndex(index);
        }, 300); // Retraso para activar el hover
        setHoverTimeout(timeout);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout); // Limpia el timeout si se sale antes del tiempo
        }
        setHoveredIndex(null); // Desactiva el hover inmediatamente
    };

    return (
        <>
            <div className='flex justify-between mt-standar p-5'>
                <h1 className='text-medio text-color-1'>Notes</h1>
                <div className='flex gap-4'>
                    <div className='bg-input-1 p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[55px]'>
                        <img src="/img/search.png" alt="Ícono" className='w-5 h-5' />
                    </div>
                    <div className='bg-input-1 p-3 rounded-[15px] flex items-center justify-center h-[55px] w-[55px]'>
                        <img src="/public/img/info_outline.png" alt="Ícono" className='w-6 h-6' />
                    </div>
                </div>
            </div>

            <div className='flex flex-wrap justify-center gap-y-4'>
                {notes.length > 0 ? (
                    notes.map((note, index) => {
                        const colorIndex = index % cardColors.length;
                        const isHovered = hoveredIndex === index;

                        const noteStyle = {
                            backgroundColor: isHovered ? 'var(--button-2)' : cardColors[colorIndex],
                            transition: 'all 0.3s ease-in-out',
                        };

                        return (
                            <div
                                key={index}
                                className='h-[100px] w-[350px] rounded-[10px] flex justify-center items-center mx-2'
                                style={noteStyle}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {isHovered ? (
                                    <img 
                                        src="/img/delete.png" 
                                        alt="Ícono" 
                                        className='w-5 h-5' 
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
                    onClick={addNote} // Añadir el manejador de clics, añadir nota
                >
                    <img src="/img/add.png" alt="Ícono" className='w-5 h-5' />
                </div>
            </div>
        </>
    );
}

export default CreateFirstNote;
