import React, { useState } from "react";

const Newactivity = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Function to handle accordion toggling
  const handleToggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the accordion if clicked again
    } else {
      setOpenIndex(index); // Open the accordion
    }
  };

  // Array of accordion items
  const accordionItems = [
    { title: "Accordion Item 1", content: "This is the content for item 1" },
    { title: "Accordion Item 2", content: "This is the content for item 2" },
    { title: "Accordion Item 3", content: "This is the content for item 3" },
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          {/* Accordion Header */}
          <button
            onClick={() => handleToggle(index)}
            className="flex justify-between items-center w-full p-4 text-left text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none"
          >
            <span>{item.title}</span>
            <span>{openIndex === index ? "-" : "+"}</span>
          </button>

          {/* Accordion Content */}
          {openIndex === index && (
            <div className="p-4 text-gray-700 bg-white">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Newactivity;
