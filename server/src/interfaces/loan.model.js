import mongoose from 'mongoose';

const LoanSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  cedula: { type: Number, required: true },
  returned: { type: Boolean, default: false }, // Nuevo campo para marcar si el libro ha sido devuelto
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

export const Loan = mongoose.model('Loan', LoanSchema);
