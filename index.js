// Simple Express backend with a few sample endpoints
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(cors());
app.use(express.json());


// Simple in-memory store (replace with DB)
const students = [
{ id: 'SUA-2023-0001', name: 'Jerome Amosi', program: 'BSc IT', status: 'active', nid: '******' }
];


app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));


app.get('/api/students/:id', (req, res) => {
const s = students.find(x => x.id === req.params.id);
if (!s) return res.status(404).json({ error: 'Not found' });
res.json(s);
});


app.post('/api/loan/apply', (req, res) => {
const { studentId, amount, termMonths } = req.body;
if (!studentId || !amount) return res.status(400).json({ error: 'studentId and amount required' });


// Basic validation + pretend decision
const application = {
id: uuidv4(),
studentId,
amount,
termMonths: termMonths || 12,
status: 'submitted',
createdAt: new Date().toISOString()
};


// In real app: verify student, call NIDA, call loan board decision engine
console.log('Loan application received', application);


return res.status(201).json({ application });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));