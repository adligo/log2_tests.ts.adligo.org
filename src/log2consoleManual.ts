import {I_Console, I_LogCtx, I_LogConfig, I_LogSegment, I_Log } from './i_log2.ts.adligo.org@slink/i_log2.mjs';
import { ConsoleWrapper, LogConfig, LogCtx, Log } from './log2.ts.adligo.org@slink/log2.mjs';

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

const props: Map<string,string> = new Map();

//
//play around with these settings, as a manual test
//
//props['level.org.adligo.ts.log2.LogCtx'] = 'TRACE';
//props['level.org.adligo.ts.log2.LogConfig'] = 'TRACE';
/*
props['level.org.adligo.ts.log2_tests.foo.a'] = 'TRACE';
props['level.org.adligo.ts.log2_tests.foo.b'] = 'DEBUG';
props['level.org.adligo.ts.log2_tests.foo.c'] = 'INFO';
props['level.org.adligo.ts.log2_tests.foo.d'] = 'WARN';
props['level.org.adligo.ts.log2_tests.foo.e'] = 'ERROR';
props['level.org.adligo.ts.log2_tests.foo.d'] = 'WARN';
props['level.org.adligo.ts.log2_tests.foo'] = 'DEBUG';
*/
props['level.org.adligo.ts'] = 'WARN';

const lcf: LogConfig = new LogConfig(props);
const lc: LogCtx = new LogCtx(lcf);
var c: I_Console = lc.getConsole();
c.trace("console trace");
c.debug("console debug");
c.info("console info");
c.warn("console warn");
c.error("console error");
var a: I_Log = lc.getLog('org.adligo.ts.log2_tests.foo.a');
cw.info('a is ' + JSON.stringify(a) + ' with level ' + a.getLevel())
a.trace('a trace');
a.debug('a debug');

var b: I_Log = lc.getLog('org.adligo.ts.log2_tests.foo.b');
cw.info('b is ' + JSON.stringify(b) + ' with level ' + b.getLevel())
b.trace('b trace');
b.debug('b debug');
b.info('b info');

var logC: I_Log = lc.getLog('org.adligo.ts.log2_tests.foo.c');
cw.info('c is ' + JSON.stringify(logC) + ' with level ' + logC.getLevel())
logC.trace('c trace');
logC.debug('c debug');
logC.info('c info');
logC.warn('c warn');

var d: I_Log = lc.getLog('org.adligo.ts.log2_tests.foo.d');
cw.info('d is ' + JSON.stringify(d) + ' with level ' + d.getLevel())
d.trace('d trace');
d.debug('d debug');
d.info('d info');
d.warn('d warn');
d.error('d error');

var e: I_Log = lc.getLog('org.adligo.ts.log2_tests.foo.e');
cw.info('e is ' + JSON.stringify(e) + ' with level ' + e.getLevel())
e.trace('e trace');
e.debug('e debug');
e.info('e info');
e.warn('e warn');
e.error('e error');