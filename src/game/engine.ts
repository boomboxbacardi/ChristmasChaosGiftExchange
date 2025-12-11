import { Player } from "../types/game";
import { clonePlayers } from "../utils/players";

export const playersSeed: Player[] = [
  { id: "p1", name: "Rudolph", packages: [] },
  { id: "p2", name: "Frost", packages: [] },
  { id: "p3", name: "Blitzen", packages: [] },
  { id: "p4", name: "Noel", packages: [] },
];

export const uid = () =>
  crypto.randomUUID?.() ?? Math.random().toString(16).slice(2);

export const rotateGifts = (direction: "left" | "right", roster: Player[]) => {
  const nextPlayers = clonePlayers(roster);
  const gifts = nextPlayers.map((p) => p.packages);
  if (direction === "left") {
    gifts.unshift(gifts.pop() ?? []);
  } else {
    gifts.push(gifts.shift() ?? []);
  }
  nextPlayers.forEach((p, idx) => {
    p.packages = gifts[idx];
  });
  return nextPlayers;
};
