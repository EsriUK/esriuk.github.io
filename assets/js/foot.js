(function() {
    for (var i=0, l=config.data.projects.categories.length; i<l; i++) { (function(i) {
        var numberOfProjects = config.data.projects.categories[i].maxRepos;
        if ((numberOfProjects && numberOfProjects > 1) || config.data.projects.categories[i].projects[0].featured !== true) {
            var targetURL = [
                "https://api.github.com/search/repositories?q=",     // Searching GitHub API for repositories
                "sort:updated",                                      // Ordered by most recently updated
                "org:esriuk",                                        // Organisation 
                "topic:" + config.data.projects.categories[i].topic, // Filter to current section
                "archived:false",                                    // Exclude archived repositories
                ].join("+")
                + "&per_page=" + numberOfProjects;                  // Gets one more result than wanted, but one might match pre-configured one
            
            controlledCacheFetchJSON(targetURL, 60000, function(data) {
                // Remove all but the first pre-configured item
                config.data.projects.categories[i].projects.splice(1);
        
                // Loop through returned item and append if not matching first pre-configured item
                for (var j=0, m=data.items.length, d=0; j<m; j++) {
                    for (var k=0, n=config.data.projects.categories[i].projects.length, alreadyThere=false; k<n; k++) {
                        if (config.data.projects.categories[i].projects[k].repo.toLowerCase() === data.items[j]["full_name"].toLowerCase()) {
                            alreadyThere = true;
                        }
                    }
                    if (!alreadyThere) {
                        config.data.projects.categories[i].projects.push({
                            "title" : data.items[j]["name"],
                            "repo" : data.items[j]["full_name"],
                            "description" : data.items[j]["description"],
                            "url" : data.items[j]["html_url"],
                            "displayLang" : data.items[j]["language"],
                            "searchLang" : encodeURIComponent(data.items[j]["language"].toLowerCase()),
                            "stars" : data.items[j]["stargazers_count"]
                        });
                        d++;
                    }
                    if (d >= (numberOfProjects - 1)) { j = m }
                }

                var guideCards = document.querySelector("#"+config.data.projects.categories[i].anchor+" .guide-cards");
                if (guideCards) {
                    var largeCard = guideCards.querySelector(".guide-card-large");
                    var content = largeCard ? largeCard.outerHTML : "";
                    for (var h=1, n=config.data.projects.categories[i].projects.length; h<n; h++) { 
                        var project = config.data.projects.categories[i].projects[h];
                        content += `
                        <div class="guide-card" data-repo="${project.repo}">
                            <span class="guide-card-stars">${project.stars && project.stars >= 1 ? '<em>' + project.stars + '</em>' : ''}</span>
                            ${project.displayLang ? `
                            <span class="guide-card-subtitle guide-card-language"><a class="guide-card-language-link" href="https://github.com/orgs/${config.org}/repositories?language=${project.searchLang}">${project.displayLang}</a></span>
                            ` : `<div></div>`}
                            <h2 class="guide-card-title">${project.title}</h2>
                            <p class="guide-card-text">${project.description == null ? "" : project.description}</p>
                            <div class="guide-card-cta">
                                <a href="${project.url}" class="btn guide-card-button">Learn more</a>
                            </div>
                        </div>
                        `;
                    }
                    guideCards.innerHTML = content;
                }
            });
        }
    })(i) }


    function controlledCacheFetchJSON(targetURL, maxAge, callback) {
        let controller = new AbortController();
        fetch(targetURL, {cache: "force-cache", signal: controller.signal})
            .then(function(response) {
                // If resouce is older than max-age, get fresh resource
                let d = response.headers.get("date") || response.headers.get("expires");
                const date = d ? new Date(d).getTime() : 0;
                if (date < (Date.now() - maxAge)) {
                    controller.abort();
                    controller = new AbortController();
                    return fetch(targetURL, {cache: "reload", signal: controller.signal});
                }
                return response;
            })
            .then(function(response) {
                if (response.status !== 200) { console.log("Problem fetching data. Status Code: " + response.status); return; }
                response.json().then(function(data) {
                    callback(data);
                })
            })
            .catch(function(e) {
                console.log("Error fetching data", e);
            })
    }

    var iconProperty = "--icon";
    var icons = document.querySelectorAll("[style*='"+iconProperty+":']");
    for (var i=0, l=icons.length; i<l; i++) {
        var url = new URL(  /* Parse icon value as URL */
            getComputedStyle(icons[i]).getPropertyValue(iconProperty)   /* Get the custom property */
            .replace(/(^\W*url\()|["']|\)\W*$|\\/g, "")                 /* Strip out whitepace, CSS url() function, and encoding artifacts (backslashes) */
        , window.location.href);                                        /* Provide context for if relative path */

        var fetchUrl = fetch(url);
        var thenText = fetchUrl.then(response => response.text());
        Promise.all([fetchUrl,thenText]).then(results => {
            var text = results[1].replace(/<!-- Code injected by live-server -->(.|\n)*/, "</svg>");
            var iconUrl = 'url("data:image/svg+xml,' + encodeURIComponent(text) + '")';

            var anchorNavIcons_styleSheet = getOrMakeStyleSheet("anchorNavIcons");

            anchorNavIcons_styleSheet.innerHTML += '.anchor-nav-item a[style*="'+results[0].url.replace(/.*(\/.*)/, "$1")+'"]:after {\n'+
            '    background-image: ' + iconUrl + ' !important;\n'+
            '}\n\n';
        });
    }



    function getOrMakeStyleSheet(id) {
        var styleSheet = document.querySelector("style#"+id);
        if (!styleSheet) {
            styleSheet = document.createElement("style");
            styleSheet.id = id;
            document.head.appendChild(styleSheet);
            styleSheet = document.querySelector("style#"+id);
        }
        return styleSheet;
    }
})();
