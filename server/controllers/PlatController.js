import { Plat } from "../models/Plate.js";
import { v2 as cloudinary } from "cloudinary";

export const AddPlat = async (req, res) => {
  try {
    const {
      name,
      subName,
      description,
      chef,
      price,
      type,
      isMain,
      isBestSelles,
    } = req.body;

    if (!req.file) {
      console.log("No file present");
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "foodly",
        public_id: `plat_${Date.now()}`,
        overwrite: true,
        quality: "auto",
        fetch_format: "auto",
      },
      async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res
            .status(500)
            .json({ error: "Error uploading image to Cloudinary" });
        }

        console.log("Cloudinary upload result:", result);

        const plateInfo = {
          name,
          subName,
          image: {
            public_id: result?.public_id,
            url: result?.secure_url,
          },
          description,
          chef,
          price,
          type,
          isMain,
          isBestSelles,
        };

        const plat = await Plat.create(plateInfo);
        console.log("Plate created:", plat);

        res.status(200).json({ plat });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error adding plate:", error);
    res.status(500).json({ error: error.message });
  }
};

export const BestSellesPlat = async (req, res) => {
  try {
    const { id } = req.body;
    const plat = await Plat.findById(id);
    if (!plat) {
      throw new Error("Could not find the Plat");
    }
    plat.isBestSelles = true;
    await plat.save();
    res.status(200).json({ plat });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const DeletePlat = async (req, res) => {
  try {
    const { id } = req.body;
    const plat = await Plat.findById(id);
    if (!plat) {
      throw new Error("Could not find the Plat");
    }
    await plat.deleteOne();
    res.status(200).json({ message: "Plate deleted successfully" });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const UpdatePlat = async (req, res) => {
  try {
    const { ...updateData } = req.body;

    const plat = await Plat.findById(req.params.id);
    if (!plat) {
      throw new Error("Could not find the Plat");
    }
    Object.assign(plat, updateData);
    await plat.save();
    res.status(200).json({ plat });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const GetPlat = async (req, res) => {
  try {
    const { id } = req.params;
    const plat = await Plat.findById(id);
    if (!plat) {
      throw new Error("Could not find the Plat");
    }
    res.status(200).json({ plat });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const GetMainPlats = async (req, res) => {
  try {
    const mainPlats = await Plat.find({ isMain: true }).limit(4);
    if (!mainPlats) {
      throw new Error("Could not find any main plates");
    }
    res.status(200).json({ mainPlats });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const GetBestSellesPlats = async (req, res) => {
  try {
    const bestSellesPlats = await Plat.find({ isBestSelles: true }).limit(10);
    if (!bestSellesPlats) {
      throw new Error("Could not find any best-selling plates");
    }
    res.status(200).json({ bestSellesPlats });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const GetFilterPlats = async (req, res) => {
  const { minPrice, maxPrice, sections, rating } = req.query;
  const filter = {};

  if (minPrice) filter.price = { $gte: Number(minPrice) };
  if (maxPrice) filter.price = { $lte: Number(maxPrice) };
  if (rating) filter.rating = { $gte: Number(rating) };

  if (typeof sections === "string") {
    filter.type = { $in: sections.split(",") };
  } else if (Array.isArray(sections)) {
    filter.type = { $in: sections };
  }

  try {
    const plats = await Plat.find(filter);
    res.status(200).json({ plats });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

export const getOldImagePublicId = async (platId) => {
  return "portfolio/old_image"; // Replace with actual logic to get old image ID
};

export const UploadImagePlat = async (req, res) => {
  try {
    const platId = req.body.platId;
    const file = req.files?.image;

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const oldImagePublicId = await getOldImagePublicId(platId);

    if (oldImagePublicId) {
      await cloudinary.uploader.destroy(oldImagePublicId);
      console.log(`Deleted old image: ${oldImagePublicId}`);
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "portfolio",
      public_id: `plat_${platId}`,
      overwrite: true,
    });

    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};
