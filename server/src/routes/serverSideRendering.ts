import fs from 'node:fs/promises';
import path from 'node:path';
import express, { Request, Response } from 'express';
import { easyRes } from '../utils';

const clientDir = path.join(__dirname, "../../../client/dist");

const app = express();

app.use(express.static(path.join(clientDir)));

app.get("/", async (req: Request, res: Response) => {
  try {

    const filePath = path.join(clientDir, 'index.html');
    let data = await fs.readFile(filePath, 'utf-8');

    res.send(data);

  } catch (err) {

    console.error(err);

    easyRes(req, res, 500, {
      message: "Couldn't render site",
      success: false,
      data: []

    });
  }
});

export default app;
