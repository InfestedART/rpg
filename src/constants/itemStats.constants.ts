import { SHIELD_STATS } from "./shieldStats.constants";
import { WEAPON_STATS } from "./weaponStats.constants";

export const ITEM_STATS = { ...WEAPON_STATS, ...SHIELD_STATS }