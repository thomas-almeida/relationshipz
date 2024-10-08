import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import { Readable } from 'stream'; // Importa Readable para converter o buffer em stream
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];


const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: "auth-408623",
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/" + encodeURIComponent(process.env.GOOGLE_CLIENT_EMAIL),
  },
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

const storage = multer.memoryStorage(); // Armazena o arquivo em memória

const upload = multer({ storage: storage });

async function uploadPhoto(req, res) {
  try {
    const { userId } = req.body;

    if (!req.file || !userId) {
      return res.status(400).send('Nenhum arquivo enviado ou userId inválido');
    }

    const fileName = req.file.originalname;

    // Converte o buffer em um ReadableStream
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    // Upload do arquivo para o Google Drive
    const fileMetadata = {
      name: fileName,
      parents: ['1ai4J6BWphexr3Fvfr9UHMlxneVTSnD89'], // ID da pasta no Google Drive
    };

    const media = {
      mimeType: req.file.mimetype,
      body: bufferStream, // Passa o ReadableStream para a API do Google Drive
    };

    // Aguarde a criação do arquivo
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink',
    });

    const { id, webViewLink, webContentLink } = response.data;
    if (!id) {
      throw new Error('Falha ao obter o ID do arquivo');
    }

    // Criar permissões públicas
    await drive.permissions.create({
      resource: {
        role: 'reader',
        type: 'anyone',
      },
      fileId: id,
    });

    // Gerar link direto
    const directLink = `https://drive.google.com/thumbnail?id=${id}`;

    // Salve o link do arquivo no banco de dados (JSON DB)
    const dbPath = path.join(__dirname, '..', 'db', 'users.json');
    const usersData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const user = usersData.find(user => user.id === userId);
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    user.photos = user.photos || [];
    user.photos.push({
      filename: fileName,
      driveId: id,
      directLink,
      webViewLink,
      webContentLink,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      ownerId: userId,
    });

    fs.writeFileSync(dbPath, JSON.stringify(usersData, null, 2), 'utf-8');

    res.send({
      message: 'Upload bem-sucedido e caminho da foto salvo',
      photoData: {
        driveId: id,
        webViewLink,
        webContentLink,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erro no servidor ao fazer o upload para o Google Drive',
      error: error.message,
    });
  }
}

async function removePhoto(req, res) {
  try {
    const { userId, driveId } = req.body;

    if (!userId || !driveId) {
      return res.status(400).send('userId ou driveId inválido');
    }

    // Caminho para o banco de dados (JSON DB)
    const dbPath = path.join(__dirname, '..', 'db', 'users.json');
    const usersData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Encontrar o usuário
    const user = usersData.find(user => user.id === userId);
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    // Encontrar o índice da foto no array de fotos
    const photoIndex = user.photos.findIndex(photo => photo.driveId === driveId);
    if (photoIndex === -1) {
      return res.status(404).send('Foto não encontrada');
    }

    // Remover a foto do array
    const removedPhoto = user.photos.splice(photoIndex, 1)[0];

    // Atualizar o banco de dados
    fs.writeFileSync(dbPath, JSON.stringify(usersData, null, 2), 'utf-8');

    // Remover o arquivo do Google Drive
    await drive.files.delete({
      fileId: driveId,
    });

    res.send({
      message: 'Foto removida com sucesso',
      removedPhoto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erro no servidor ao remover a foto',
      error: error.message,
    });
  }
}

export { uploadPhoto, upload, removePhoto };
