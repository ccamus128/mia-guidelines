<!-- Section : LESS Guidelines -->
<section id="sass-guidelines">
<!-- Sub Heading : Begin -->
<header>
    <h1>SASS</h1>
</header>
<!-- Sub Heading : Begin -->
<h3>What is SASS?</h3>
<p>CSS Preprocessors extend CSS with dynamic behavior such as variables, mixins, operations and functions.
    Our preprocessor of choice is LESS, for more information <a href="http://www.lesscss.org/" target="_blank">click
        here</a>.</p>

<!-- Sub Heading : Begin -->
<h3>Naming Conventions</h3>
<p>All applicable CSS naming conventions should be followed in your LESS implementation.</p>
<p>Use camel case when naming variables:</p>
<pre>
@tooltipColor: #fff;
@tooltipBackground: #000;
@tooltipArrowWidth: 5px;
@tooltipArrowColor: @tooltipBackground;
</pre>
<!-- Sub Heading : Begin -->
<h3>File Structure</h3>
<p>There are five .less files that are included in our default templates:</p>
<ul>
    <li>normalize.less</li>
    <li>variables.less</li>
    <li>mixins.less</li>
    <li>utilities.less</li>
    <li>base.less</li>
    <li>global.less</li>
</ul>

<h5>variables.less</h5>
<p>All variables to be used within your LESS implementation should be defined in this file.
    Declarations should be in the following order :</p>
<ul>
    <li>Colors</li>
    <li>Background/ Text Colors</li>
    <li>Link Colors</li>
    <li>Typography</li>
    <li>Project Specific Variables</li>
</ul>

<pre>
// -------------------------
// Variables
// -------------------------

// Greys
// -------------------------
@grey1: darken(#fff, 10%);
@grey2: darken(@grey1, 10%);
...

// Accent colors
// -------------------------
@blue:  #049cdb;
@green: #46a546;
@red: #9d261d;
...

// Scaffolding
// -------------------------
@bodyBackground: @white;
@textColor: @grey8;

// Links
// -------------------------
@linkColor: darken(@red, 10%);
@linkColorHover: darken(@linkColor, 15%);
@linkColorVisited: darken(@linkColor, 25%);

// Typography
// -------------------------
@sansFontFamily: "Helvetica Neue", Helvetica, Arial, sans-serif;
@serifFontFamily: Georgia, "Times New Roman", Times, serif;
@monoFontFamily: Monaco, Menlo, Consolas, "Courier New", monospace;

@baseFontSize: 14px;
@baseFontFamily: @sansFontFamily;
@baseLineHeight: 20px;
@altFontFamily: @serifFontFamily;

@headingsFontFamily: inherit; // empty to use BS default, @baseFontFamily
@headingsFontWeight: bold;    // instead of browser default, bold
@headingsColor: @blue; // empty to use BS default, @textColor

// Project Specific
// -------------------------
...
</pre>

<h5>utilities.less</h5>
<p>This file will provide some very generic styles that can be used throughout the site.</p>

<h5>base.less</h5>
<p>This file will provide basic element styling that can be used throughout the site.</p>

<h5>global.less</h5>
<p>This file is used to combine various LESS files. It provides should provide common styles and
    variables that will be used throughout your LESS implementation. Ensure that any styles included
    within global.less will be used throughout the site. By default global.less looks like this:</p>
<pre>
// CSS Reset
@import "normalize.less"; // Maintain consistency across browsers

// Core variables and mixins
@import "variables.less";
@import "mixins.less";
@import "utilities.less";

@import "base.less";
</pre>

<p>By using this approach we can determine the order in which our LESS files will be combined.</p>
<div class="alert alert-info"><strong>Note:</strong> Need to add more information regarding the splitting of files.
</div>

<!-- Sub Heading : Begin -->
<h3>Formatting</h3>
<h5>Mixins</h5>
<p>Group mixins toward the top of your style declarations. This makes it easy for other developers to
    see what mixins are being applied. It also allows for values to be overridden if necessary.</p>
<pre class="lang-css">
section {
    .rounded-border(5px);

    border-color:#ddd;
}
.rounded-border(@radius) {
  border: 1px solid #999;
  -webkit-border-radius: @radius @radius @radius @radius;
  -moz-border-radius: @radius @radius @radius @radius;
  border-radius: @radius @radius @radius @radius;
}
</pre>

<h5>Helpful Built-in LESS functions</h5>
<table class="option-list">
    <thead>
    <tr>
        <th>Function</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>e(str)</td>
        <td>returns a string without the surrounding quotes. See String Unquoting</td>
    </tr>
    <tr>
        <td>floor(number)</td>
        <td>returns the floor of a numerical input</td>
    </tr>
    <tr>
        <td>round(number)</td>
        <td>returns the rounded value of numerical input</td>
    </tr>
    <tr>
        <td>lighten(color, percent)</td>
        <td>lightens color by percent and returns it</td>
    </tr>
    <tr>
        <td>darken(color, percent)</td>
        <td>darkens color by percent and returns it</td>
    </tr>
    <tr>
        <td>saturate(color, percent)</td>
        <td>saturates color by percent and returns it</td>
    </tr>
    <tr>
        <td>desaturate(color, percent)</td>
        <td>desaturates color by percent and returns it</td>
    </tr>
    <tr>
        <td>fadein(color, percent)</td>
        <td>makes color less transparent by percent and returns it</td>
    </tr>
    <tr>
        <td>fadeout(color, percent)</td>
        <td>makes color more transparent by percent and returns it</td>
    </tr>
    <tr>
        <td>spin(color, amount)</td>
        <td>returns a color with amount degrees added to hue</td>
    </tr>
    <tr>
        <td>fade(color, amount)</td>
        <td>returns a color with the alpha set to amount</td>
    </tr>
    <tr>
        <td>hue(color)</td>
        <td>returns the hue of color</td>
    </tr>
    <tr>
        <td>saturation(color)</td>
        <td>returns the saturation of color</td>
    </tr>
    <tr>
        <td>lightness(color)</td>
        <td>returns the lightness of color</td>
    </tr>
    <tr>
        <td>alpha(color)</td>
        <td>returns the alpha value of color or 1.0 if it doesn’t have an alpha</td>
    </tr>
    <tr>
        <td>percentage(number)</td>
        <td>converts a floating point number to a percentage, e.g. 0.65 –> 65%</td>
    </tr>
    <tr>
        <td>mix(color1, color1, percent)</td>
        <td>mixes two colors by percentage where 100% keeps all of color1, and 0% keeps all of color2. Will take into
            account the alpha of the colors if it exists.
        </td>
    </tr>
    <tr>
        <td>rgbahex(color)</td>
        <td>returns a string containing 4 part hex color.</td>
    </tr>
    </tbody>
</table>

<footer>
    <a href="#top" title="Back to top"><span class="hidden-phone">Back to top</span> <i class="icon-chevron-up"></i></a>
</footer>
</section>