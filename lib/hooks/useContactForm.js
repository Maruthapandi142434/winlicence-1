import { useState } from 'react';
import { contactProduct } from '../api';
import { getProductPrice } from '../utils/productPrice';
import { toast } from 'react-toastify';

export const useContactForm = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedProductForContact, setSelectedProductForContact] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');

  const handleContactUsClick = (product) => {
    setSelectedProductForContact(product);
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
    setSelectedProductForContact(null);
    // Clear form fields when closing the modal
    setName('');
    setEmail('');
    setPhone('');
    setCompanyName('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { price, cycle } = getProductPrice(selectedProductForContact);

    const formData = {
      name,
      email,
      phone,
      company: CompanyName,
      message,
      subject: {
        title: selectedProductForContact?.name || 'N/A',
        price: price,
        description: selectedProductForContact?.description || 'N/A',
        category: selectedProductForContact?.category || 'N/A',
      },
    };

    try {
      await contactProduct(formData);
      console.log('Form submitted successfully!');
      toast.success('Your message has been sent!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleCloseContactForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    showContactForm,
    selectedProductForContact,
    isSubmitting,
    name,
    email,
    phone,
    CompanyName,
    message,
    
    // Setters
    setName,
    setEmail,
    setPhone,
    setCompanyName,
    setMessage,
    
    // Actions
    handleContactUsClick,
    handleCloseContactForm,
    handleSubmit,
  };
};
