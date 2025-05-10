import React, { useEffect, useState } from 'react';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router';
import { toast, Toaster } from 'sonner';

function MerchantForm() {
  const data = useActionData();
  const { deliveryPeople } = useLoaderData();

  const [formData, setFormData] = useState({
    title: '',
    size: '',
    weight: '',
    address: '',
    deliveryPersonId: '',
  });

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (data?.messages) {
      data.messages.forEach(msg => toast.error(msg));
    }
  }, [data]);

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  }

  return (
    <div className="py-5 min-h-screen flex flex-col items-center justify-center">
      <Toaster richColors closeButton="true" />
      <h1 className="text-4xl font-bold text-center mb-8 text-[#e5e5e5]">
        Add Delivery
      </h1>

      <div className="bg-[#e5e5e5] p-8 rounded-xl shadow-lg w-full max-w-[80%]">
        <Form method="post" className="space-y-6">
          {[
            { id: 'title', label: 'Title', type: 'text' },
            { id: 'size', label: 'Package Size', type: 'number' },
            { id: 'weight', label: 'Weight', type: 'number' },
            { id: 'address', label: 'Address', type: 'text' },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="labelStyle">
                {label}:
              </label>
              <input
                id={id}
                name={id}
                type={type}
                required
                onChange={handleChange}
                value={formData[id]}
                className="inputStyle"
              />
            </div>
          ))}

          <div>
            <label htmlFor="deliveryPersonId" className="labelStyle">
              Assign to Delivery Person:
            </label>
            <select
              id="deliveryPersonId"
              name="deliveryPersonId"
              required
              onChange={handleChange}
              value={formData.deliveryPersonId}
              className="w-full shadow border border-gray-300 h-10 px-4 py-2 rounded-lg focus:outline-none hover:ring-1 hover:bg-[#ffa91e] hover:ring-black focus:ring-1 focus:bg-[#ffa91e] focus:ring-black text-black bg-white"
            >
              <option value="">Select a person</option>
              {deliveryPeople.map(person => (
                <option key={person.id} value={person.id}>
                  {person.username}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="buttonStyle"
            >
              {isSubmitting ? 'Saving...' : 'Add'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default MerchantForm;
