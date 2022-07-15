# esriuk.github.io

Landing page for Esri UK open source tools and apps, and presentation resources.

## Configuration

Page content is configured using a JavaScript object set with [`config.js`](https://github.com/EsriUK/esriuk.github.io/blob/main/assets/js/config.js). This controls:
* Page title, description, tagline (both in the banner and metadata)
* The GitHub organisation
* The sections shown, including:
    * icons, titles, descriptions
    * the number of repositories to show and topic(s) to filter by
    * The featured item to show for each section

The sections will alternate between a dark and light theme. The sections will include a number of cards representing repositories up to the configured `maxRepos` which are loaded from the [GitHub Search API](https://docs.github.com/en/rest/search#about-the-search-api). Should the API's rate limit be reached, these cards will be omitted.

The page is highly tolerant of faults in the configuration and will accommodate missing fields either by omitting content or falling back to default values (in the case of the page title and GitHub organisation). Should no `config.js` file be present or an error be present within it, the page will default to showing a single section entitled ["Repositories"](https://raw.githubusercontent.com/EsriUK/esriuk.github.io/main/assets/img/error-in-config.png) containing up to eight recently updated repositories.

The sticky anchor navigation will be present when the viewport is wide enough and when more than one section is present. Sections will be included provided that they are configured with both a title and anchor (id).

A static "lite" version of the Esri UK global navigation, as present on [esriuk.com](https://www.esriuk.com/en-gb/home) is present.

## Editing

The landing page \([index.html](https://github.com/EsriUK/esriuk.github.io/blob/main/index.html)\) uses JavaScript template literals as a HTML templating system. This is used within script tags which remove themselves once ran. Two functions, `template` and `templateIfElse`, are available to help with this. For example:

* Using templateIfElse to display content from `config.js` with a fall back if that it is not defined 
```html
    <script id="template">templateIfElse(config.title, `
    <h1>${config.title}</h1>
    `, `
    <h1>Hello world</h1>
    `);
    </script>
```

* Alternatively, conditionally display content and removing the script without the use of the helper functions
```html
    <script id="template">
    var content = `
        ${config.description ? `<p>${config.description}</p>` : ""}
    `;
    document.querySelector("script#template").outerHTML = content;
    </script>
```

Most styles are contained within [`head.css`](https://github.com/EsriUK/esriuk.github.io/blob/main/assets/css/head.css) and [`calcite-web`](https://esri.github.io/calcite-web/) is available to use. The styles for the header and footer navigations are within [`global-nav-lite.css`](https://github.com/EsriUK/esriuk.github.io/blob/main/assets/css/global-nav-lite.css). Supporting JavaScript is contained within [`foot.js`](https://github.com/EsriUK/esriuk.github.io/blob/main/assets/js/foot.js) and handles loading of content from the GitHub Search API and dynamic stylesheet generation. There are placeholders in `index.html` for potential `head.js` and `foot.css` files.

To edit simply fork and clone the project, or edit the files directly on [github.com](https://github.com/EsriUK/esriuk.github.io). No dependencies or build processes are required.

## License

Copyright &copy; 2022 Esri UK

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

   https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

A copy of the license is available in the repository's [LICENSE](https://github.com/EsriUK/esriuk.github.io/blob/main/LICENSE) file.

