import mongoose, { Document, Schema } from 'mongoose';

export type TranscriptionStatus = 'pending' | 'completed' | 'failed';

export interface ITranscription extends Document {
  audioUrl: string;
  transcription?: string;
  status: TranscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TranscriptionSchema = new Schema<ITranscription>(
  {
    audioUrl: { type: String, required: true },
    transcription: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

const TranscriptionModel =
  mongoose.models.Transcription ||
  mongoose.model<ITranscription>('Transcription', TranscriptionSchema);

export default TranscriptionModel;
