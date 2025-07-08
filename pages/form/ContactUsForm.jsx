import { useState } from 'react';
import { contactusForm } from '../../lib/api'; // Adjust the import path accordingly

const initState = { values: {}, isLoading: false }; // Initialize values properly

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    email: '',
    company: '',
    message: '',
    checkbox: false,
  });

  const [state, setState] = useState(initState); // Initialize the state
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  function validateForm() {
    // Name: only letters and spaces, min 2 chars
    if (!/^[A-Za-z ]{2,}$/.test(formData.name.trim())) {
      return 'Please enter a valid name (letters and spaces only, at least 2 characters).';
    }
    // Indian phone: 10 digits, starts with 6-9
    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      return 'Please enter a valid 10-digit mobile number.';
    }
    // Email: basic format
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    const errorMsg = validateForm();
    if (errorMsg) {
      setFormError(errorMsg);
      return;
    }
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      await contactusForm(formData); // Use formData instead of values
      alert('Form submitted successfully!');
      setFormData({
        name: '',
        phone: '',
        subject: '',
        email: '',
        company: '',
        message: '',
        checkbox: false,
      }); // Reset form after successful submission
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit form. Please try again later.');
    } finally {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  return (
    <div className="contactusform">
      <form onSubmit={onSubmit} className="space-y-6 " id='contactform'>
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {formError}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="formField">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Email */}
          <div className="formField">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Phone */}
          <div className="formField">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Subject */}
          <div className="formField">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter your subject"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Company */}
          <div className="formField">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter your company name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Message */}
          <div className="formField col-span-full">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="checkbox flex items-center">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={formData.checkbox}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="checkbox" className="ml-2 block text-sm text-gray-700">
            I consent to the collection and processing of my personal data for the purpose of responding to my inquiry. I acknowledge that my data will be handled in accordance with your{' '}
            <a href="/about/privacypolicy" target="_blank" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state.isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          id='form-submit'
        >
          {state.isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;