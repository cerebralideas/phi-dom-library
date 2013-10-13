phi-dom-library
===============

A polyfill library for phi.

## Needed features:

- [ ] A fallback for classList: a way of adding, toggling and removing class or classes from a DOM element.
- [ ] A fallback for hasClass, the jQuery method for testing the existance of a class.
- [ ] A fallback for accessing data attributes from a DOM element.
- [ ] A fallback for handling stopPropogation and preventDefault. Josh has already done some work in this area; see his overlay.js.
- [ ] A more jQuery way of selecting elements. Just wrapping the native getElementById, getElementsByTagName and [querySelectorAll](http://ejohn.org/blog/thoughts-on-queryselectorall/). Just test for the existance of a hash, a dot and just alphanumeric to know which to use.
- [ ] A "polyfill" for event delegation (think jQuery's .on() method).

## Resources:

- [Uncovering the Native DOM API](http://flippinawesome.org/2013/06/17/uncovering-the-native-dom-api/)
- [Creating jQuery-style functions in JavaScript, hasClass, addClass, removeClass, toggleClass](http://toddmotto.com/creating-jquery-style-functions-in-javascript-hasclass-addclass-removeclass-toggleclass/)
- [jQuery itself will be a great resource](http;//jquery.com), you could really just cherry pick their code right out of their library to save a ton of time.
- [Out-Growing jQuery](http://tech.pro/tutorial/1385/out-growing-jquery)
