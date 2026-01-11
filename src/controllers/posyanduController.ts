import { Request, Response } from 'express';
import Posyandu from '../models/Posyandu';

const getAllPosyandu = async (req: Request, res: Response) => {
  try {
    const data = await Posyandu.find();

    const geoJSON = {
      type: "FeatureCollection",
      features: data.map((posyandu) => ({
        type: "Feature",
        id: posyandu._id,
        geometry: {
          type: "Point",
          coordinates: posyandu.geometry.coordinates, 
        },
        properties: {
          nama: posyandu.nama,
          jumlah_kasus: posyandu.jumlah_kasus,
          foto: posyandu.foto,
        },
      })),
    };

    res.status(200).json(geoJSON);
  } catch (error) {
    res.status(500).json({ message: "Error ambil data", error });
  }
};

export default getAllPosyandu;