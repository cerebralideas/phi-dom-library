phi-dom-library
===============

A simple dom library for phi.

Needed features:

1. A "polyfill" for classList: a way of adding, toggling and removing class or classes from a DOM element.
1. A "polyfill" for hasClass, the jQuery method for testing the existance of a class.
1. A "polyfill" for accessing data attributes from a DOM element.
1. A "polyfill" for handling stopPropogation and preventDefault. Josh has already done some work in this area; see his overlay.js.
1. A more jQuery way of selecting elements. Just wrapping the native getElementById, getElementsByTagName and [querySelectorAll](http://ejohn.org/blog/thoughts-on-queryselectorall/). Just test for the existance of a hash, a dot and just alphanumeric to know which to use.
1. A "polyfill" for click event listener.

Resources:

- [Uncovering the Native DOM API](http://flippinawesome.org/2013/06/17/uncovering-the-native-dom-api/)
- [Creating jQuery-style functions in JavaScript, hasClass, addClass, removeClass, toggleClass](http://toddmotto.com/creating-jquery-style-functions-in-javascript-hasclass-addclass-removeclass-toggleclass/)
- [jQuery itself will be a great resource](http;//jquery.com), you could really just cherry pick their code right out of their library to save a ton of time.
- [Out-Growing jQuery](http://tech.pro/tutorial/1385/out-growing-jquery)
