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

import { I_Equatable } from '@ts.adligo.org/i_obj/dist/i_obj.mjs';
import { I_AssertionContext, I_Test } from '@ts.adligo.org/i_tests4ts/dist/i_tests4ts.mjs';
import { ApiTrial } from '@ts.adligo.org/tests4ts/dist/trials.mjs';
import { TrialSuite } from '@ts.adligo.org/tests4ts/dist/tests4ts.mjs';
import { Test } from '@ts.adligo.org/tests4ts/dist/tests.mjs';
import { LogCtx, LogConfig, ConsoleWrapper, LogSegment } from '@ts.adligo.org/log2/dist/log2.mjs';
import { LogLevel, I_Console } from '@ts.adligo.org/i_log2/dist/i_log2.mjs';
import { JUnitXmlGenerator } from '@ts.adligo.org/junit-xml-tests4j/dist/junitXmlTests4jGenerator.mjs';

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
  public static readonly TESTS: I_Test[] = [
    new Test('testLogLevels', (ac: I_AssertionContext) => {
      const mockConsole = new MockConsole();
      const config = new LogConfig(new Map<string, string>([
        ["level.test", "DEBUG"],
      ]), '<logName/> <level/>: <message/>');
      const ctx = new LogCtx(config, mockConsole);
      const log = ctx.getLog('test');

      ac.equals(LogLevel.DEBUG, log.getLevel(), 'The log should be at Debug');
      
      log.trace('Trace message');
      log.debug('Debug message');
      log.info('Info message');
      log.warn('Warn message');
      log.error('Error message');


      ac.equals(5, mockConsole.messages.length, 'Only messages at or above DEBUG level should be logged');
      ac.equals('info', mockConsole.messages[0].level, 'First message should be info');
      ac.equals('org.adligo.ts.log2.LogCtx INFO: Creating log \'test\' with level 1',
        mockConsole.messages[0].message,
        'First message content check');
      ac.equals('test DEBUG: Debug message', mockConsole.messages[1].message,
        'Second message content check');
      ac.equals('debug', mockConsole.messages[1].level, 'Second message should be debug');

    }),
  /**
   * had strange issues
   * @param ac 
   */
  new Test('testLogSegment', (ac: I_AssertionContext) => (ac: I_AssertionContext) => {
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
    }),
  new Test('testConfigProperties', (ac: I_AssertionContext) => {
      const properties = { 'level.test': 'WARN', 'format': 'Custom <message/>' };
      const config = new LogConfig(new Map<string, string>([
        ["level.test", "WARN"],
      ]), 'Custom <message/>');
      ac.isTrue(config.getLevel('test') === LogLevel.WARN, 'Config should parse level from properties');
      ac.isTrue(config.getFormat() === 'Custom <message/>', 'Config should parse format from properties');
    })
    ];
}



console.log(process.versions);
// Define trial and suite
const trial = new ApiTrial('Log2Trial',LogTests.TESTS);
const suite = new TrialSuite('Log2Suite', [trial] );


// Run tests and print report
suite.run().printTextReport().printTestReportFiles(new JUnitXmlGenerator());