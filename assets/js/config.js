var config = {
    organisation: "Esri UK",
    tagline: "Tools, apps, and more",
    description: "Open source tools, apps, and more from Esri UK",
    org: "esriuk",
    twitter: "@esriuk",
    data: {
        projects: {
            categories: [{
                title: "Localised Tools",
                description: "These are a set of open source apps, tools and scripts for use by the UK community",
                url: "https://github.com/esriuk?q=topic:esriuk-localisation",
                topic: "esriuk-localisation",
                anchor: "localised-tools",
                icon: "/assets/svg/projects/apps-48.svg",
                maxRepos: 5,
                projects: [{
                    title: "mapstyler",
                    repo: "esriuk/mapstyler",
                    description: "Style an Esri vector tile layer style using an image or colour palette.",
                    image: "/assets/img/projects/mapstyler.jpg",
                    url: "https://github.com/esriuk/mapstyler",
                    displayLang: "JavaScript",
                    searchLang: "javascript",
                    featured: true
                }]
            },
            {
                title: "Presentation Code/Apps",
                url: "https://github.com/esriuk?q=topic:esriuk-presentation",
                topic: "esriuk-presentation",
                anchor: "presentations",
                icon: "/assets/svg/projects/presentation-48.svg",
                maxRepos: 1,
                projects: [{
                    title: "Presentations",
                    description: "Presentations from conferences and events.",
                    image: "/assets/img/projects/presentations.png",
                    imageAlt: "Richard Mumford presenting 'Introduction to ArcGIS for Developers' at the 2019 Esri UK Scottish Conference",
                    url: "https://github.com/esriuk/presentations",
                    displayLang: "&nbsp;",
                    searchLang: null,
                    featured: true
                }]
            },
            {
                title: "Innovation Apps",
                url: "https://github.com/esriuk?q=topic:esriuk-innovation",
                topic: "esriuk-innovation",
                anchor: "innovation-apps",
                icon: "/assets/svg/projects/science-48.svg",
                maxRepos: 5,
                projects: [{
                    title: "esri-polymer",
                    repo: "esriuk/esri-polymer",
                    description: "A set of Esri web components built using the Polymer library.",
                    image: "/assets/img/projects/innovation.png",
                    imageAlt: "Esri Polymer Screenshot - Action Shot",
                    url: "https://github.com/EsriUK/esri-polymer",
                    displayLang: "HTML",
                    searchLang: "html",
                    featured: true
                }]
            }]
        }
    }
}