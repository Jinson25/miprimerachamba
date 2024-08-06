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
    startDate: { type: Date, required: true },  // Agregado
    endDate: { type: Date, required: true },
    cedula: { type: Number, required: true },
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
