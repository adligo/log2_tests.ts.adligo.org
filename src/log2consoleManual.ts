import {I_Console, I_LogCtx, I_LogConfig, I_LogSegment, I_Log } from './i_log2.ts.adligo.org@slink/i_log2.mjs';
import { ConsoleWrapper } from './log2.ts.adligo.org@slink/log2.mjs';

// Was running this file with commands like
//  npx tsx src/log2consoleManual.ts
// hey
const cw: ConsoleWrapper = new ConsoleWrapper();
cw.debug("debug");
cw.debug(["debug","arr"]);
cw.info("info");
cw.info(["info","arr"]);
cw.error("error");
cw.error(["error","arr"]);
cw.trace("trace");
cw.trace(["trace","arr"]);
cw.warn("warn");
cw.warn(["warn","arr"]);