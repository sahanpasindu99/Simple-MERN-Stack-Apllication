import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const[file,setFile]=useState();


  useEffect(() => {
    axios.get('http://localhost:8022/clients')
      .then((res) => {
        setClients(res.data);
        setFile(res.data[3].file);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  const handleClientSelect = (client) => {
    setSelectedClient(client);
  };

  return (
    <div class="min-h-screen flex items-center justify-center text-gray-700 bg-gray-50">
  <div class="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
    <h2 class="shadow-b-lg text-2xl font-semibold mb-4 text-center">List of Clients</h2>
    <div class="h-60 overflow-y-auto">
      <table class="w-full mb-4 border-[1px]">
        <thead class="">
          <tr className="bg-gray-100">
            <th class="py-2 pr-8">ID</th>
            <th class="py-2 pr-12">Client Name</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client._id}
              onClick={() => handleClientSelect(client)}
              class="cursor-pointer hover:bg-gray-200"
            >
              <td class="px-4 py-2">{client._id}</td>
              <td class="px-8 py-2">{client.customerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    

    {selectedClient && (
      <div className='bg-gray-100 rounded-lg mt-4 text-sm'>
        <h2 class="pt-2 pl-3 text-xl font-ibold mb-4">Loan Details for {selectedClient.customerName}</h2>
  
        <table class="border-collapse border-slate-400  w-full mb-4 border-[1px] ">
        <thead class="border-[1px]">
          <tr className=" bg-gray-100">
            <th class="border border-slate-300  py-2 px-5">Client</th>
            <th class="border border-slate-300 py-2 ">Loan Amount</th>
            <th class="border border-slate-300 py-2 "> Duration(Months)</th>
            <th class="border border-slate-300 py-2">Bank File</th>
            <th class="border border-slate-300 py-2">Installment(Monthly)</th>
            <th class="border border-slate-300 py-2 ">Final Payment Date</th>
         
          </tr>
        </thead>
        <tbody class="border-[1px]">
     
            <tr
              class=" text-center border-[1px] ml-4 py-4 cursor-pointer bg-white hover:bg-gray-50"
            >
              <td class="border border-slate-300 mx-4">{selectedClient.customerName}</td>
              <td class="border border-slate-300 mx-4">{selectedClient.loanAmount}</td>
              <td class="border border-slate-300 mx-4">{selectedClient.loanDuration}</td>
              <td class="border border-slate-300 mx-4"><Link to={`http://localhost:8022/Files/`+ selectedClient.bankFile}>{selectedClient.bankFile}</Link></td>
              <td class="border border-slate-300 mx-4">{selectedClient.monthlyInstallment}</td>
              <td class="border border-slate-300 mx-4">{selectedClient.lastPaymentDate}</td>
            </tr>
          
        </tbody>
      </table>
      </div>
    )}
  </div>
</div>

  );
};

export default Clients;
