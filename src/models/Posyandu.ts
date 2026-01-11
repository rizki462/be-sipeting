import mongoose, { Schema, Document } from 'mongoose';

export interface IPosyandu extends Document {
  nama: string;
  jumlah_kasus: string | number;
  foto: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  externalId: number;
}

const PosyanduSchema: Schema = new Schema({
  nama: { type: String, required: true },
  jumlah_kasus: { type: Schema.Types.Mixed, default: 0 },
  foto: { type: String },
  geometry: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  externalId: { type: Number }
});

// Penting: Tambahkan index 2dsphere agar query peta jadi cepat
PosyanduSchema.index({ geometry: '2dsphere' });

const PosyanduModel = mongoose.model<IPosyandu>('Posyandu', PosyanduSchema);

export default PosyanduModel;