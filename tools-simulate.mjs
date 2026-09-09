import fs from "node:fs";
import {
  calculateSpin,
  createRng
} from "./public/js/engine.js";

const config = JSON.parse(
  fs.readFileSync(new URL("./public/config/default-config.json", import.meta.url), "utf8")
);

const spins = Math.max(1000, Number(process.env.SPINS || 100000));
const bet = Number(process.env.BET || config.allowedBets[0]);
const random = createRng(Number(process.env.SEED || 20260725));

let totalBet = 0;
let totalWin = 0;
let hitCount = 0;
let scatterCount = 0;

for (let i = 0; i < spins; i++) {
  const result = calculateSpin(config, bet, { random, isFreeSpin: false });
  totalBet += bet;
  totalWin += result.totalWin;
  if (result.totalWin > 0) hitCount++;
  if (result.scatter.freeSpinsAwarded > 0) scatterCount++;
}

console.log(JSON.stringify({
  spins,
  bet,
  totalBet,
  totalWin,
  estimatedRtpPercent: Number((totalWin / totalBet * 100).toFixed(3)),
  hitRatePercent: Number((hitCount / spins * 100).toFixed(3)),
  scatterTriggerPercent: Number((scatterCount / spins * 100).toFixed(3)),
  payoutScale: config.payoutScale,
  note: "Hasil simulasi statistik, bukan jaminan hasil tiap pemain."
}, null, 2));
