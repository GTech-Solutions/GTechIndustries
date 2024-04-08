const nxPreset = require('@nx/jest/preset').default;

module.exports = {
    ...nxPreset,
    silent: false,
    transformIgnorePatterns: ['/node_modules/(?!react-cv/.*)'],
};
