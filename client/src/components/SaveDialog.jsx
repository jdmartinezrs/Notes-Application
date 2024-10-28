import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SaveDialog = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <Card className="w-[360px] bg-zinc-800 text-white">
        <CardContent className="p-6">
          <div className="flex justify-end mb-4">
            <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center">
              <span className="text-lg">i</span>
            </div>
          </div>
          
          <h2 className="text-2xl mb-6 text-center">Save changes?</h2>
          
          <div className="flex gap-4 justify-center">
            <button 
              className="px-6 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors"
              onClick={() => console.log('Discard clicked')}
            >
              Discard
            </button>
            <button 
              className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors"
              onClick={() => console.log('Save clicked')}
            >
              Save
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaveDialog;