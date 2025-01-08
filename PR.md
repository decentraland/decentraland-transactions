# Add ethers v5 and v6 compatibility

## Problem

The package assumes ethers v5 syntax (`new ethers.utils.Interface()`), causing runtime errors with dependent packages using ethers v6 (e.g., decentraland-connect@7.3.2) due to different interface creation syntax (`ethers.Interface.from()`).

## Solution

Added version-agnostic helper methods that support both ethers v5 and v6:

1. `_createInterface`: Attempts v6 syntax first, falls back to v5
2. `_createWeb3Provider`: Supports both v6 `BrowserProvider` and v5 `Web3Provider`
3. Updated peer dependencies:

```json
"peerDependencies": {
  "ethers": ">=5.7.2 <7.0.0"
}
```

## Implementation

- Added helper methods in AxelarProvider class
- Added proper error handling and logging
- Updated all interface creation calls to use helpers
- Added version compatibility documentation in README

## Tests

Added tests covering:

- Interface creation with v5/v6 syntax
- Web3Provider creation with v5/v6 providers
- Route execution and error handling
- Squid initialization and transaction handling

## Additional Notes

- Type assertions handle expected linter errors from version differences
- Clear error messages for debugging version-related issues
- Full test coverage for new functionality
