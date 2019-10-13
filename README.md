## Bugs

https://github.com/facebook/react-native/issues/22237

## How to apply fixes

1. Copy the `"react-native": ...` line from package-fixed.json to package.json
2. Reinstall react-native: `yarn install --force`
3. Restart your bundler server: `react-native start --reset-cache`
4. Build and run the project again
