import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const PORT: number = 1000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`bot running on Port :${PORT}`);
});
