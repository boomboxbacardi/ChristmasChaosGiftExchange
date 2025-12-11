export type GamePhase = "setup" | "warmup" | "endgame" | "ended";

export type Package = {
  id: string;
  locked?: boolean;
};

export type Player = {
  id: string;
  name: string;
  packages: Package[];
};

export type LogEntry = {
  id: string;
  message: string;
  detail?: string;
};

export type RollOutcome = {
  roll: number;
  title: string;
  description: string;
  phase: GamePhase;
};
