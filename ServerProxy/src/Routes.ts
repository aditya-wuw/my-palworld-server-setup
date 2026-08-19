import type { Response } from "express";
import type { Request } from "express";
import { Router } from "express";
import { Auth, ServerEndPoint } from "../index.ts";

export const Routes = Router();
Routes.get("/", async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Ok" });
});

Routes.get("/save", async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${ServerEndPoint}/v1/api/save`, {
      headers: { Authorization: Auth, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      console.error(response.status);
      return res.status(400).json({ message: "Failed to trigger save" });
    }
    return res.status(200).json({ message: "World file saved" });
  } catch (e) {
    console.error("Something went wrong", e);
    return res.status(500).json({ message: "Server Error" });
  }
});

Routes.get("/getplayers", async (req: Request, res: Response) => {
  const response = await fetch(`${ServerEndPoint}/v1/api/players`, {
    headers: { Authorization: Auth },
  });
  const data = await response.json();

  interface FilteredPlayersType {
    name: string;
    ping: number;
    level: number;
    building_count: number;
  }

  interface PlayersType {
    name: string;
    accountName: string;
    playerId: string;
    userId: string;
    ip: string;
    ping: number;
    location_x: number;
    location_y: number;
    level: number;
    building_count: Number;
  }

  const Players: FilteredPlayersType[] = data.players.map((p: PlayersType) => ({
    name: p.name,
    ping: p.ping,
    level: p.level,
    building_count: p.building_count,
  }));

  return res.status(200).json({ message: Players });
});

Routes.get("/getstatus", async (req: Request, res: Response) => {
  interface ServerInfo {
    version: string;
    servername: string;
    description: string;
    worldguid: string;
  }

  const response = await fetch(`${ServerEndPoint}/v1/api/info`, {
    headers: { Authorization: Auth },
  });
  if (!response.ok)
    return res.status(503).json({ message: "Server is currently Offline" });
  const data = (await response.json()) as ServerInfo;
  const msg = `Server is Online\n**${data.servername}** ${data.version}`;
  return res.status(200).json({ message: msg });
});
