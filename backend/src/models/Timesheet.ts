import mongoose, { Document, Schema } from 'mongoose';

export interface ITimesheet extends Document {
  internId: mongoose.Types.ObjectId;
  date: Date;
  taskTitle: string;
  description?: string;
  githubLink?: string;
  status: 'Completed' | 'In Progress' | 'Blocked';
}

const timesheetSchema = new Schema<ITimesheet>({
  internId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true, default: Date.now },
  taskTitle: { type: String, required: true },
  description: { type: String },
  githubLink: { type: String },
  status: { type: String, enum: ['Completed', 'In Progress', 'Blocked'], required: true }
}, { timestamps: true });

export const Timesheet = mongoose.model<ITimesheet>('Timesheet', timesheetSchema);