const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customerName: String,
  loanAmount: Number,
  loanDuration: Number,
    bankFile: String,
    monthlyInstallment: Number,
    lastPaymentDate:[Date]
});

const Loan = mongoose.model('customers', loanSchema);

module.exports = Loan;
