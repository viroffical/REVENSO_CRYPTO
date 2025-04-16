import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import Image from 'next/image';
import CaseNavigator from './case-navigator';

const ProfessionalForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      occupation: '',
      bio: '',
      event: ''
    }
  });

  const [characterCount, setCharacterCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');

  const events = [
    { id: 'token2049', name: 'TOKEN 2049', image: '/assets/token2049.svg' },
    { id: 'ethdenver', name: 'ETH Denver', image: null },
    { id: 'solanabreakpoint', name: 'Solana Breakpoint', image: null }
  ];

  const handleBioChange = (e) => {
    const value = e.target.value;
    setCharacterCount(value.length);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event.name);
    setIsDropdownOpen(false);
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your API
    alert('Form submitted successfully!');
  };

  return (
    <>
      <Head>
        <title>Professional Details</title>
      </Head>

      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
        <CaseNavigator />
        <div className="py-8 max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Professional Details</h2>
            <p className="mt-2 text-sm text-gray-600">
              Tell us about your professional background
            </p>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* Occupation Field */}
              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                  Occupation
                </label>
                <input
                  id="occupation"
                  type="text"
                  {...register('occupation', { required: 'Occupation is required' })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="e.g. Software Engineer"
                />
                {errors.occupation && (
                  <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>
                )}
              </div>

              {/* Bio Field */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio (160 characters max)
                </label>
                <div className="mt-1 relative">
                  <textarea
                    id="bio"
                    {...register('bio', { 
                      required: 'Bio is required',
                      maxLength: {
                        value: 160,
                        message: 'Bio cannot exceed 160 characters'
                      }
                    })}
                    onChange={handleBioChange}
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                    placeholder="Tell us about yourself..."
                    maxLength={160}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    {characterCount}/160
                  </div>
                </div>
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                )}
              </div>

              {/* Event Dropdown */}
              <div>
                <label htmlFor="event" className="block text-sm font-medium text-gray-700">
                  Event
                </label>
                <div className="mt-1 relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <span className="flex items-center">
                      {selectedEvent && selectedEvent === 'TOKEN 2049' && (
                        <span className="flex-shrink-0 h-6 w-6 mr-3 relative">
                          <Image 
                            src="/assets/token2049.svg" 
                            alt="TOKEN 2049" 
                            width={24}
                            height={24}
                            className="rounded object-cover"
                          />
                        </span>
                      )}
                      <span className="block truncate">
                        {selectedEvent || 'Select an event'}
                      </span>
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <ul
                      className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                      tabIndex="-1"
                      role="listbox"
                    >
                      {events.map((event) => (
                        <li
                          key={event.id}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          onClick={() => {
                            handleEventSelect(event);
                            register('event').onChange({ target: { value: event.name } });
                          }}
                        >
                          <div className="flex items-center">
                            {event.image && (
                              <span className="flex-shrink-0 h-6 w-6 mr-3 relative">
                                <Image 
                                  src={event.image} 
                                  alt={event.name} 
                                  width={24}
                                  height={24}
                                  className="rounded object-cover"
                                />
                              </span>
                            )}
                            <span className={`block truncate ${selectedEvent === event.name ? 'font-medium' : 'font-normal'}`}>
                              {event.name}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <input
                    type="hidden"
                    {...register('event', { required: 'Please select an event' })}
                    value={selectedEvent}
                  />
                </div>
                {errors.event && (
                  <p className="mt-1 text-sm text-red-600">{errors.event.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalForm;