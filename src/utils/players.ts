import { Player } from "../types/game";

export const clonePlayers = (players: Player[]) =>
  players.map((p) => ({
    ...p,
    packages: [...p.packages.map((pkg) => ({ ...pkg }))],
  }));

export const findPlayersWithGifts = (
  players: Player[],
  excludeIndex?: number,
  requireUnlocked = false
) =>
  players
    .map((p, idx) => ({ player: p, idx }))
    .filter(({ player, idx }) => {
      if (excludeIndex !== undefined && idx === excludeIndex) return false;
      if (!requireUnlocked) return player.packages.length > 0;
      return player.packages.some((pkg) => !pkg.locked);
    });
