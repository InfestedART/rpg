import { BOOTS_STATS, GLOVES_STATS, HELMET_STATS } from "./gearStats.constants";
import { SHIELD_STATS } from "./shieldStats.constants";
import { WEAPON_STATS } from "./weaponStats.constants";

export const ITEM_STATS = {
  ...WEAPON_STATS,
  ...SHIELD_STATS,
  ...GLOVES_STATS,
  ...HELMET_STATS,
  ...BOOTS_STATS
}