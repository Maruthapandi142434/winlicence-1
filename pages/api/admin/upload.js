import { IncomingForm } from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = new IncomingForm({
      uploadDir: './public/uploads',
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error uploading file' });
      }

      const file = files.file[0];
      const fileName = file.originalFilename;
      const newPath = path.join('./public/uploads', fileName);

      try {
        await fs.rename(file.filepath, newPath);
        return res.status(200).json({
          location: `/uploads/${fileName}`
        });
      } catch (error) {
        console.error('Error moving file:', error);
        return res.status(500).json({ error: 'Error saving file' });
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
} 