var Log = new Logger(true, true);

function fn() {

  Logger("Simple line");

  Log.mute(false);
  Log.i("this is a simple test", true, "args");
  Log.mute(true);
  Log.i("this line will be ignored", true, "args");
  Log.mute(false);

  Logger.mute(false);
  Logger.i("this is a test for static instance");
  Logger.mute(true);
  Logger.i("this is a test for static instance but ignored");
  Logger("Simple line ignored");
  Log.i("this line will be ignored", true, "args");
}


fn();
