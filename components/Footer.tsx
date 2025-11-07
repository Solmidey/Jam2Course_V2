import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto" aria-label="Application footer">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {currentYear} Jam2Course. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Powered by a love for learning.</p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);