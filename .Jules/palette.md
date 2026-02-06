## 2025-02-06 - Dead DOM Generation Pattern
**Learning:** The app creates DOM elements manually in loops but overwrites them with string concatenation at the end. This leads to confusion and potential bugs (like undefined variables in the string path).
**Action:** When modifying rendering logic, check if `innerHTML` assignment at the end of the function invalidates previous DOM manipulations. Prefer editing the string template or cleaning up the dead code.
