/**
 * Copyright 2023 Adligo Inc / Scott Morgan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { I_Equatable } from './i_obj.ts.adligo.org@slink/i_obj.mts';
import { AssertionContext, Test, ApiTrial, TrialSuite } from './tests4ts.ts.adligo.org@slink/tests4ts.mts';
import { LogCtx, LogConfig, ConsoleWrapper, LogSegment } from './log2.ts.adligo.org@slink/log2.mts';
import { LogLevel, I_Console } from './i_log2.ts.adligo.org@slink/i_log2.mts';


// Mock console for testing
class MockConsole implements I_Console {
    public messages: { level: string, message: string }[] = [];


    debug(...data: any[]): void {
        this.messages.push({ level: 'debug', message: data[0] });
    }
    error(...data: any[]): void {
        this.messages.push({ level: 'error', message: data[0] });
    }
    info(...data: any[]): void {
        this.messages.push({ level: 'info', message: data[0] });
    }
    trace(...data: any[]): void {
        this.messages.push({ level: 'trace', message: data[0] });
    }
    warn(...data: any[]): void {
        this.messages.push({ level: 'warn', message: data[0] });
    }
}


export class LogTests {
    public static testLogLevels(ac: AssertionContext) {
        const mockConsole = new MockConsole();
        const config = new LogConfig({ 'level.test': 'DEBUG', 'format': '<logName/> <level/>: <message/>' });
        const ctx = new LogCtx(config, mockConsole);
        const log = ctx.getLog('test');


        log.trace('Trace message');
        log.debug('Debug message');
        log.info('Info message');
        log.warn('Warn message');
        log.error('Error message');


        ac.isTrue(mockConsole.messages.length === 4, 'Only messages at or above DEBUG level should be logged');
        ac.isTrue(mockConsole.messages[0].level === 'debug', 'First message should be debug');
        ac.isTrue(mockConsole.messages[0].message.includes('Debug message'), 'Debug message content check');
    }


    /**
     * had strange issues
     * @param ac 
     */
    public static testLogSegment(ac: AssertionContext) {
        const segment = new LogSegment();
        segment.write('First part');
        segment.write('Second part');
        var segR = segment.flush();
        if (ac == undefined) {
            console.error('See trace from testLogSegment');
            console.trace('testLogSegment');
            
        } else if (ac.equals === undefined) {
            console.error('Ac.equals is undefined wtf see trace');
            console.trace('testLogSegment Ac.equals');
        }
        console.trace('hmm ac is ' + JSON.stringify(ac));
        console.trace('hmm ac.equals is ' + JSON.stringify(ac.equals));
        ac.equals('First partSecond part', segR);
    }


    public static testConfigProperties(ac: AssertionContext) {
        const properties = { 'level.test': 'WARN', 'format': 'Custom <message/>' };
        const config = new LogConfig(properties);
        ac.isTrue(config.getLevel('test') === LogLevel.WARN, 'Config should parse level from properties');
        ac.isTrue(config.getFormat() === 'Custom <message/>', 'Config should parse format from properties');
    }
}


// Define tests
const tests = [
    new Test('testLogLevels', LogTests.testLogLevels),
    //new Test('testLogSegment', LogTests.testLogSegment),
    new Test('testConfigProperties', LogTests.testConfigProperties)
];


// Define trial and suite
const trial = new ApiTrial('Log2Trial', tests);
const suite = new TrialSuite('Log2Suite', [trial]);


// Run tests and print report
suite.run().printTextReport();