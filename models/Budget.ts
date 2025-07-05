import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: String,
  amount: Number,
});

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
