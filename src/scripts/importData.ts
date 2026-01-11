import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Posyandu from '../models/Posyandu';
import connect from '../config/database';
import geojsonData from '../assets/geojson/map.json';

dotenv.config();

const importData = async () => {
  try {
    // Koneksi ke Database
    await connect();

    // Bersihkan Data Lama (Agar tidak double saat running ulang)
    console.log("Sedang membersihkan data lama...");
    await Posyandu.deleteMany({});

    // Mapping Data GeoJSON ke Schema MongoDB
    const formattedData = geojsonData.features.map((feature: any) => {
      // Logika pembersihan data jumlah_kasus
      const kasusRaw = feature.properties.jumlah_kasus;
      const kasusFinal = (kasusRaw === "-" || typeof kasusRaw !== 'number') ? 0 : kasusRaw;

      return {
        nama: feature.properties.nama,
        jumlah_kasus: kasusFinal,
        foto: feature.properties.foto,
        id_objek: feature.id,
        geometry: {
          type: "Point",
          coordinates: feature.geometry.coordinates
        },
      };
    });

    // Insert ke MongoDB
    await Posyandu.insertMany(formattedData);
    
    console.log(`Sukses! ${formattedData.length} data Posyandu berhasil masuk ke MongoDB.`);
    process.exit(0);
  } catch (error) {
    console.error("Error saat import data:", error);
    process.exit(1);
  }
};

importData();