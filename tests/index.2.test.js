jest.unmock('../dist/logger');
const Logger = require('../dist/logger').default;

// debugger;
const Log = new Logger('Test');

const TEST_ALIASES = {
    l: 'log',
    d: 'debug',
    i: 'info',
    w: 'warn',
    e: 'error'
};

const TEST_METHODS = {
    log: 'method_log',
    debug: 'method_debug',
    info: 'method_info',
    warn: 'method_warn',
    error: 'method_error'
};


Logger.print = function(alias) {
    const method = TEST_ALIASES[ alias ];
    const str = TEST_METHODS[method];

    STR_COMPARE = str;
}

let STR_COMPARE = '';

const entries = Object.entries(TEST_METHODS);
for( let entry of entries ) {
    const method = entry[0];
    const alias = method.charAt(0);
    const str = entry[1];

    // Logger[method] = Logger[alias] = Logger.prototype[method] = Logger.prototype[alias] = function() {
    //     STR_COMPARE = str;
    // };

    test(`STATIC ${method.toUpperCase()} method`, () => {
        Logger[method]();
        expect(STR_COMPARE).toBe(str );
        STR_COMPARE = '';
    });

    test(`INSTANCE ${method.toUpperCase()} method`, () => {
        Log[method]();
        expect(STR_COMPARE).toBe(str);
        STR_COMPARE = '';
    });

}


// GET LOGGER INSTANCE
test('get Logger instance', () => {
    const tLog = Logger.getLogger('Test');
    expect( tLog instanceof Logger ).toBe( true );
});


test('STATIC change level', () => {
    let level = Logger.level();
    expect(level).toBe(4);
    // test info
    Logger.info()
    expect(STR_COMPARE).toBe(TEST_METHODS.info);
    STR_COMPARE = "";

    Logger.level( 2 );
    Logger.info();
    expect(STR_COMPARE).toBe('');
    STR_COMPARE = "";

    Log.info();
    expect(STR_COMPARE).toBe(TEST_METHODS.info);
    STR_COMPARE = "";

    Logger.level(2, true);
    Log.info();
    expect(STR_COMPARE).toBe('');
    STR_COMPARE = "";
});

test('INSTANCE change level', () => {
    let level = Log.level;
    expect(level).toBe(2);
    // test warn
    Log.warn()
    expect(STR_COMPARE).toBe(TEST_METHODS.warn);
    STR_COMPARE = '';

    Log.level = 1;
    Logger.warn();
    expect(STR_COMPARE).toBe(TEST_METHODS.warn);
    STR_COMPARE = '';

    Log.info();
    expect(STR_COMPARE).toBe('');
    STR_COMPARE = '';

    Log.error();
    expect(STR_COMPARE).toBe(TEST_METHODS.error);
    STR_COMPARE = '';
});


// CHECK MUTE
test('mute Logger instance', () => {
    const tLog = Logger.getLogger('Test');

    tLog.error();
    expect(STR_COMPARE).toBe(TEST_METHODS.error);
    STR_COMPARE = '';
    tLog.mute = true;
    tLog.error();
    expect(tLog.mute).toBe(true);
    expect(STR_COMPARE).toBe('');
    STR_COMPARE = '';
    tLog.mute = false;
});

test("INSTANCE mute level", () => {
  let level = Log.level;
  expect(level).toBe(4);
  // test warn

    Log.level = 'none';

    Log.log();
    expect(STR_COMPARE).toBe('');
    STR_COMPARE = '';
    Log.debug();
    expect(STR_COMPARE).toBe('');
    STR_COMPARE = '';
    Log.info();
    expect(STR_COMPARE).toBe('');
    STR_COMPARE = '';
    Log.warn();
    expect(STR_COMPARE).toBe('');
    STR_COMPARE = '';
    Log.error();
    expect(STR_COMPARE).toBe('');
    STR_COMPARE = '';
});
