import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaTrash, FaPhone, FaEnvelope, FaUser } from 'react-icons/fa';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/contacts';

  // --- API Functions ---
  useEffect(() => {
    fetchContacts();
    // Ensure form is empty on mount
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    // Clear input value directly to prevent browser autofill
    const clearInput = () => {
      if (nameInputRef.current) {
        nameInputRef.current.value = '';
        setFormData(prev => ({ ...prev, name: '' }));
      }
    };
    
    // Clear immediately and after a short delay (browsers sometimes autofill after render)
    clearInput();
    const timeoutId = setTimeout(clearInput, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API_URL);
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteContact = async (id) => {
    if(!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // --- Form Handling ---
  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.phone) tempErrors.phone = "Phone is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      const res = await axios.post(API_URL, formData);
      setContacts([res.data, ...contacts]); // Optimistic UI update
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    // Map contact-name back to name for formData
    const fieldName = e.target.name === 'contact-name' ? 'name' : e.target.name;
    setFormData({ ...formData, [fieldName]: e.target.value });
    if (errors[fieldName]) setErrors({ ...errors, [fieldName]: null });
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Connectify</h1>
        <p className="text-gray-500">MERN Stack Contact Manager</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              {/* Hidden dummy inputs to trick browser autofill */}
              <input type="text" name="fake-username" autoComplete="off" style={{ display: 'none' }} tabIndex="-1" />
              <input type="password" name="fake-password" autoComplete="off" style={{ display: 'none' }} tabIndex="-1" />
              
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400"><FaUser /></span>
                  <input
                    ref={nameInputRef}
                    type="text"
                    name="contact-name"
                    id="contact-name-input"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="off"
                    data-lpignore="true"
                    data-form-type="other"
                    data-1p-ignore="true"
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'}`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400"><FaEnvelope /></span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'}`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400"><FaPhone /></span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="off"
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'}`}
                    placeholder="+1 234 567 890"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  rows="3"
                  placeholder="Additional notes..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Contact'}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: LIST */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Contact List <span className="text-sm font-normal text-gray-500">({contacts.length})</span></h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {contacts.map((contact) => (
              <div key={contact._id} className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow relative group">
                <button 
                  onClick={() => deleteContact(contact._id)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <FaTrash />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{contact.name}</h3>
                    <p className="text-xs text-gray-500">Added: {new Date(contact.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2"><FaEnvelope className="text-gray-400"/> {contact.email}</p>
                  <p className="flex items-center gap-2"><FaPhone className="text-gray-400"/> {contact.phone}</p>
                  {contact.message && (
                    <div className="mt-3 bg-gray-50 p-2 rounded text-xs italic text-gray-500">
                      "{contact.message}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {contacts.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p>No contacts found. Add one to get started!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;