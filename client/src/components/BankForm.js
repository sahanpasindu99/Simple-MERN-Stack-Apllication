import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BankForm = () => {
  const [fileError, setFileError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    loanAmount: '',
    loanDuration: '',
    bankFile: null,
  });
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'bankFile') {
      const selectedFile = files[0];
      if (selectedFile) {
        const fileType = selectedFile.name.split('.').pop();
        if (!['pdf', 'csv', 'txt'].includes(fileType)) {
          setFileError('Invalid file type. Please select a .pdf, .csv, or .txt file.');
          setFormData({
            ...formData,
            [name]: null,
          });
        } else {
          setFileError('');
          setFormData({
            ...formData,
            [name]: selectedFile,
          });
        }
      } else {
        setFileError('');
        setFormData({
          ...formData,
          [name]: null,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('customerName', formData.customerName);
    formDataToSend.append('loanAmount', formData.loanAmount);
    formDataToSend.append('loanDuration', formData.loanDuration);
    formDataToSend.append('bankFile', formData.bankFile);

    try {
      await axios.post('http://localhost:8022/form', formDataToSend);
      setIsSubmitted('Submitted Succesfully');
      setFormData({ customerName:'',
      loanAmount: '',
      loanDuration: '',
      bankFile: null
    }); 
      setFileError('');

    } catch (error) {
      console.error('Error submitting loan application:');
      setIsSubmitted('Submission Failed');
      

    }setTimeout(() => {
      setIsSubmitted('');
    }, 3000);
  };

  return (
  <div className='flex justify-center items-center h-screen'>
    <div className="w-[70%] bg-gray-100 p-4 rounded-lg shadow-lg justify-center items-center">
    <h1 className="text-2xl font-bold text-center">Loan Application</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4 w-[50%] mx-auto pt-5 ">
        <label className="block text-sm font-medium text-gray-700">Customer Name:</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
          className=" mt-1 p-2 block  w-full border rounded-md bg-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4 w-[50%] mx-auto  ">
        <label className="block text-sm font-medium text-gray-700">Loan Amount:</label>
        <input
          type="number"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border rounded-md bg-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
       
      </div>
      <div className="mb-4 w-[50%] mx-auto ">
        <label className="block text-sm font-medium text-gray-700">Loan Duration (months):</label>
        <input
          type="number"
          name="loanDuration"
          value={formData.loanDuration}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border rounded-md bg-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4 w-[50%] mx-auto ">
        <label className="block text-sm font-medium text-gray-700">Bank File:</label>
        <input
          type="file"
          name="bankFile"
          accept=".pdf, .csv, .txt"
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border rounded-md bg-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        /> 
        {fileError && (
              <p className="text-red-500 text-sm mt-1">{fileError}</p>
            )}
            
      </div>
      
      <div className="flex  justify-center">
      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 px-4 mr-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    <Link to="/clients" >
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        View All
      </button>
    </Link>
      </div>
       {isSubmitted === 'Submitted Succesfully' && (
        <p className="text-center mt-3 text-blue-600 text-sm">{isSubmitted}</p>
      )}
      {isSubmitted === 'Submission Failed' && (
        <p className="text-center mt-3 text-red-700 text-sm">{isSubmitted}</p>
      )}
      
      
    </form>
    
  </div>
  </div>
  
  );
};

export default BankForm;
