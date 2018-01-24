export default class Log{

    /*
     * Class' constructor.
     * @Params:
     *  logname @string
     *  showGog @boolean
     *
     * @Returns:
     *  @Object
     */
    constructor(logname, showLog){
        this.logname = logname || 'Lite-log';
        return this.exposeMethods(showLog);
    }

    /*
     * Methods currently supported by lite-log
     */
    methods(){
        return [
            { name: 'log'     , alias: 'l' , icon: '👀' },
            { name: 'warn'    , alias: 'w' , icon: '✋' },
            { name: 'error'   , alias: 'e' , icon: '‼️' },
            { name: 'info'    , alias: 'i' , icon: 'ℹ️' },
            { name: 'count'   , alias: 'c' , icon: '✏️' },
            { name: 'group'   , alias: 'gs', icon: '☀️' },
            { name: 'groupEnd', alias: 'ge', icon: '⛅️' },
            { name: 'time'    , alias: 'ts', icon: '⏱' },
            { name: 'timeEnd' , alias: 'te', icon: '⏰' }
        ]};

    /*
     * Expose supported methods by
     * overriding default console.
     */
    exposeMethods(showLog){

        /*
         * Should show logs?
         */
        showLog === undefined ? showLog = true : showLog;

        /*
         * Declare available methods as empty object.
         * It will be filled after the loop.
         */
        const availableMethods = {};

        /*
         * Apply basic styling to logs and assign
         * a new logging method looping the methods() function.
         */
        this.methods().map((method) => {

            /*
             * Get browser's default console instance.
             */
            const oldConsole = console[method.name];

            /*
             * Override default console behavior.
             * Add style to console output and write instance reference (logname).
             */
            console[method.name] = (...args) => {
                args.unshift(`[~ ${method.icon} ${this.logname} ~] `);
                oldConsole.apply(null, args)
            };

            /*
             * Should the log to be displayed?
             * if false, point to null function.
             */
            const mayShow = () =>{
                return showLog
                    ? console[method.name]
                    : () => {};
            };

            /*
             * Define if default methods and aliases
             * can be displayed.
             */
            const newMethods = {
                [method.name]: mayShow(),
                [method.alias]: mayShow()
            };

            /*
             * Finally merge objects into an unique
             * object to be exposed to the user,
             * then end mapping.
             */
            Object.assign(availableMethods, newMethods);
        });

        return availableMethods;
    }

}
