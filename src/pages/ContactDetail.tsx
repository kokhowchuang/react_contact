import React from 'react';
import { useParams } from 'react-router-dom';

const ContactDetails = () => {
  const { id } = useParams();

  // Assuming you have a list of contacts somewhere, you can find the contact with the matching id
  // For this example, we'll just display the contact id
  return (
    <div>
      <h1>Contact Details</h1>
      <p>Contact ID: {id}</p>
    </div>
  );
};

export default ContactDetails;
