import React, { useState } from 'react';
import { sanitizeHTML, sanitizeURL, createSafeChangeHandler } from '../utils/inputSanitizer';

/**
 * Example component demonstrating safe input handling
 */
const SafeInput = () => {
  const [textInput, setTextInput] = useState('');
  const [htmlInput, setHtmlInput] = useState('');
  const [urlInput, setUrlInput] = useState('');

  // Example of using createSafeChangeHandler
  const handleTextChange = createSafeChangeHandler((e) => {
    setTextInput(e.target.value);
  });

  // Example of manual sanitization
  const handleHtmlChange = (e) => {
    const sanitized = sanitizeHTML(e.target.value);
    setHtmlInput(sanitized);
  };

  const handleUrlChange = (e) => {
    const sanitized = sanitizeURL(e.target.value);
    setUrlInput(sanitized);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Safe Input Example</h2>
      
      {/* Text Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Safe Text Input
        </label>
        <input
          type="text"
          value={textInput}
          onChange={handleTextChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter text..."
        />
        <p className="mt-1 text-sm text-gray-500">
          Sanitized value: {textInput}
        </p>
      </div>

      {/* HTML Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          HTML Content
        </label>
        <textarea
          value={htmlInput}
          onChange={handleHtmlChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter HTML content..."
          rows="3"
        />
        <div 
          className="mt-2 p-3 border rounded-md bg-gray-50"
          dangerouslySetInnerHTML={{ __html: htmlInput }}
        />
      </div>

      {/* URL Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL Input
        </label>
        <input
          type="url"
          value={urlInput}
          onChange={handleUrlChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter URL..."
        />
        <p className="mt-1 text-sm text-gray-500">
          Sanitized URL: {urlInput}
        </p>
      </div>
    </div>
  );
};

export default SafeInput; 