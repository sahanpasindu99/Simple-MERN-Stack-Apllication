const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors=require('cors')
const fs = require('fs');
const Loan = require('./models/Loan');

const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(cors())
const port = 8022;

const Url=("mongodb+srv://spasindu700:TIN7haeqkZloTbu4@cluster0.pnjjdwc.mongodb.net/LoanDetails?retryWrites=true&w=majority");
const connectionParams={
    useNewUserParser:true,
    useUnifiedTopology:true
}


mongoose.connect(Url)
.then(()=>{
   console.log("Connected to DB");
 })
 .catch((e)=> {
  console.log(e);
  console.log("connection error")
}
  );

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Files');
  },
  filename: (req, file, cb) => {
    cb(null,file.fieldname + "_"+ Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage:storage });

app.post('/form', upload.single('bankFile'), async (req, res) => {
 try {
    const { customerName, loanAmount, loanDuration } = req.body;
    const bankFile = req.file.filename;

     const monthlyInstallment = loanAmount / loanDuration;

    const repaymentSchedule = [];
    const currentDate = new Date();
    for (let i = 0; i < loanDuration; i++) {
      const nextRepaymentDate = new Date(currentDate);
      nextRepaymentDate.setMonth(currentDate.getMonth() + (i + 1));
      repaymentSchedule.push(nextRepaymentDate);

    }
    const lastDate = repaymentSchedule[ repaymentSchedule.length - 1];
    
    const loan = new Loan({
      customerName,
      loanAmount,
      loanDuration,
      bankFile,
      monthlyInstallment,
      lastPaymentDate:lastDate
    });
    // await loan.save()
    // res.status(201).json({ message: 'Loan application submitted successfully' });
    //   console.log("Loan application submitted successfully")
    
      await loan.save();
      if(loan.save){
        res.status(201).json({ message: 'Submitted Successfull' });
      console.log('Submittion Successfull');

      }
      
  } catch (error) {
    console.error('Error submitting loan application:', error);
    res.status(500).json({ error: 'Submission Failed' });
  }
});

app.get('/clients', async (req, res) => {
  try {
    const clients = await Loan.find({}, {
      customerName: 1,
      loanAmount: 1,
      loanDuration: 1,
      bankFile: 1,
      monthlyInstallment: 1,
      lastPaymentDate: 1,
    }).exec();

    res.status(200).json(clients);
  } catch (error) {
    console.error('Error listing clients:', error);
    res.status(500).json({ error: 'Failed to list clients' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
