const WbMerge = require("webpack-merge");


function freeze_version() {

  let level = "patch";

  const FS = require("fs");
  const SemVer = require("semver");
  const Package = require("./package.json");

  let version = Package.version;

  let new_version = SemVer.inc(version, level);

  console.info("Freezing version from", version, "to", new_version);

  Package.version = new_version;

  FS.writeFileSync( "./package.json", JSON.stringify(Package, null, 2), "utf-8" );

}

function generate_new_version() {

  let level = "patch";

  const FS = require("fs");
  const SemVer = require("semver");
  const Package = require("./package.json");

  let version = Package.version;
  version = SemVer.inc(version, `pre${level}`);

  console.info("Genereate new version", version);

  Package.version = version;

  FS.writeFileSync( "./package.json", JSON.stringify(Package, null, 2), "utf-8" );

}

freeze_version();

const WbConfig = require("./webpack-config");
delete WbConfig.devtool;
delete WbConfig.entry;

// generate_new_version();


module.exports = WbMerge(WbConfig, {

  mode: 'production',

  entry: {
    zero: './index.js'
  },

  watch: false,

  output: {
    filename: "logger.umd.js",
    libraryTarget: 'umd',
    library: 'logger',
    umdNamedDefine: true,
    globalObject: 'this'
  }
})

