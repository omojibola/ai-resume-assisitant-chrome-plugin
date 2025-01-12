import React from 'react';
import { AlertTriangle } from 'lucide-react';

const WarningBanner: React.FC = () => {
  return (
    <div className='flex items-center gap-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-md shadow mb-5'>
      <AlertTriangle className='text-yellow-500' size={24} />
      <div className='flex-1'>
        <p className='text-yellow-800'>
          Oops!. This page does not seem like a job application page, If you
          think we are wrong, let us know{' '}
          <a
            href='mailto:support@jobscanner.com'
            className='text-blue-600 underline hover:text-blue-800'
          >
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default WarningBanner;
