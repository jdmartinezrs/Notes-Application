import React, { useState, useEffect } from 'react';

const InsideNotes = () => {

    
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');

        const autoResize = (e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
        };
    
    return (
        <>
              <div className='flex justify-between mt-standar p-5'>
                <div className='bg-input-1 p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[55px]'>
                    <img src="/img/chevron_left.png" alt="Ícono" className='w-3 h-5' />
                </div>
                <div className='bg-input-1 p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[55px]'>
                    <img src="/img/mode.png" alt="Ícono" className='w-5 h-5' />
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
        </>

        
    );
}

export default InsideNotes;