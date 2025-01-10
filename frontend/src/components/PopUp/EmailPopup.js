import React, { useState } from 'react';
import emailTemplates from '../SampleData/emailTemplates.json';

const EmailPopup = ({ onSubmit }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState('');

  const handleSubmit = () => {
    if (!selectedTemplateId) {
      alert('Please select an email template!');
      return;
    }

    // Find the full template data based on the selected ID
    const selectedTemplate = emailTemplates.find(
      (template) => template.id === selectedTemplateId
    );

    if (selectedTemplate) {
      // Pass the entire template object to onSubmit
      onSubmit(selectedTemplate);
    }

   
  };

  return (
    <div className="fixed w-[250px] md:w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 border border-gray-300 rounded shadow-lg z-50">
      <h3 className="mb-3">Select Email Template</h3>
      <select
        value={selectedTemplateId}
        onChange={(e) => setSelectedTemplateId(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">-- Select Template --</option>
        {emailTemplates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => onSubmit(null)}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EmailPopup;
