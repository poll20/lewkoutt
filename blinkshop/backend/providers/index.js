const imagekitProvider = require("./imagekitProvider");
const r2Provider = require("./r2Provider");

const providers = {
  imagekit: imagekitProvider,
  r2: r2Provider,
};

module.exports =
  providers[process.env.STORAGE_PROVIDER] ||
  imagekitProvider;