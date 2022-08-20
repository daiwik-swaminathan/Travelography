// To do
// rename website
// make home page dynamically loaded instead of redirected if causes issue

var countries = []
var states = []
var cities = []

function transformGrid(e)
{
    e.preventDefault()

    let locationName = e.target.textContent

    locationName = locationName.replace(/[^a-zA-Z. ]/g, "").trim()

    var parentElement = e.target.parentNode
    
    if(parentElement.tagName == 'LI' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) // add the mobile check here
    {
        var dropDownUl = parentElement.querySelector('.dropdown')
        if(dropDownUl)
        {
            if(dropDownUl.offsetParent == null)
            {
                dropDownUl.setAttribute("style", "visibility: visible; opacity: 0.85; display: block; min-width: 300px; text-align: left; padding-top: 20px; padding-left: 20px; z-index:999;")
                return
            }
        }
    }  

    if(locationName == 'Photography')
    {
        window.location.href = "index.html"
        return
    }

    if(mapCountry(locationName))
    {
        return
    }

    if(mapState(locationName))
    {
        return
    }
    
    mapCity(locationName)
}

function changeBody(newEntries)
{
    // delete article
    var article = document.querySelector('article')
    if(article)
    {
        article.remove()
    }

    // delete singleList
    var singleList = document.querySelector('.singleList')
    if(singleList)
    {
        singleList.remove()
    }

    // delete image-grid
    var imageGrid = document.querySelector('.image-grid')
    if(imageGrid)
    {
        imageGrid.remove()
    }

    // delete gallery
    var gallery = document.querySelector('.gallery')
    if(gallery)
    {
        gallery.remove()
    }

    // add new box(es)
    var bodyContainer = document.querySelector('.body-container')
    bodyContainer.appendChild(newEntries)
}

function mapCity(cityName)
{
    // build gallery of city's photos
    var photoGallery = document.createElement('div')
    photoGallery.className = 'gallery'

    // build new nav bar
    var navBarUl = document.querySelector('.primary-navigation ul')
    navBarUl.innerHTML = getMinimumNavBarUl()

    for(let i=0; i<cities.length; i++)
    {
        if(cities[i].name == cityName)
        {
            for(let j=0; j<cities[i].imageTags.length; j++)
            {
                let imageDiv = document.createElement('div')

                imageDiv.className = cities[i].imageTags[j]

                imageDiv.innerHTML = `<img src="images/${cities[i].country}${cities[i].state}${cityName}/${cityName}${(j+1)}.jpeg" alt="no image">`
            
                photoGallery.appendChild(imageDiv)
            }

            addDropdownTextLi(countries[cities[i].countryID], false)
            if(cities[i].stateID >= 0)
            {
                addDropdownTextLi(states[cities[i].stateID], false)
            }
            addDropdownTextLi(cities[i], true)
        }
    }

    changeBody(photoGallery)

    addClickableToLinkable()
}

function mapState(stateName)
{
    let found = false

    // build output grid of state's entries
    var stateEntries = document.createElement('div')
    stateEntries.className = 'singleList'

    // build new nav bar
    var navBarUl = document.querySelector('.primary-navigation ul')
    navBarUl.innerHTML = getMinimumNavBarUl()

    for(let i=0; i<states.length; i++)
    {
        if(states[i].name == stateName)
        {
            found = true
            if(states[i].entries.length >= 6)
            {
                stateEntries.className = 'image-grid'
            }
            for(let j=0; j<states[i].entries.length; j++)
            {
                let entryName = states[i].entries[j]

                stateEntries.innerHTML +=
                `
                    <div class="linkable-image"">
                        
                        <img src="images/${states[i].country}/${stateName}/${entryName}/${entryName}1.jpeg" alt="no image" width=100%>
                        <h1>${entryName}</h1>
                        
                    </div>
                `
            }

            addDropdownTextLi(countries[states[i].countryID], false)
            addDropdownTextLi(states[i], false)
        }
    }

    if(!found)
    {
        return
    }

    changeBody(stateEntries)

    addClickableToLinkable()

    return found
}

function mapCountry(countryName)
{
    console.log(countryName)
    let found = false

    // build output grid of country's entries
    var countryEntries = document.createElement('div')
    countryEntries.className = 'singleList'

    // build new nav bar
    var navBarUl = document.querySelector('.primary-navigation ul')
    navBarUl.innerHTML = getMinimumNavBarUl()

    for(let i=0; i<countries.length; i++)
    {
        if(countries[i].name == countryName)
        {
            found = true
            if(countries[i].entries.length >= 6)
            {
                countryEntries.className = 'image-grid'
            }
            for(let j=0; j<countries[i].entries.length; j++)
            {
                let entryName = countries[i].entries[j]

                countryEntries.innerHTML +=
                `
                    <div class="linkable-image"">
                        
                        <img src="images/${countries[i].name}/${entryName}/${entryName}1.jpeg" alt="no image" width=100%>
                        <h1>${entryName}</h1>
                        
                    </div>
                `
            }

            addDropdownTextLi(countries[i], false)
        }
    }

    if(!found)
    {
        return
    }

    // countryLinkLi.appendChild(countryLinkUl)
    // navBarUl.appendChild(countryLinkLi)

    changeBody(countryEntries)

    addClickableToLinkable()

    return found
}

function addDropdownTextLi(locationObject, isEndpoint)
{
    var navBarUl = document.querySelector('.primary-navigation ul')

    var linkLi = document.createElement('li')
    linkLi.innerHTML =  `<a class="dropdown-text">${locationObject.name} &rtrif;</a>`

    if(!isEndpoint)
    {
        var linkUl = document.createElement('ul')
        linkUl.className = 'dropdown'

        for(let i=0; i<locationObject.entries.length; i++)
        {
            linkUl.innerHTML += `<li>${locationObject.entries[i]}</li>`
        }

        linkLi.appendChild(linkUl)
    }

    navBarUl.appendChild(linkLi)
}

function getMinimumNavBarUl()
{
    return `
    <li>
        <a class="dropdown-text">Photography &rtrif;</a>
        <ul class="dropdown">
            <li>United States</li>
            <li>Canada</li>
            <li>Fiji</li>
            <li>India</li>
            <li>United Kingdom</li>
            <li>United Arab Emirates</li>
        </ul>
    </li>
    `
}

function addClickableToLinkable()
{
    var linkableImages = document.querySelectorAll('.linkable-image')
    linkableImages.forEach(box => {
        box.addEventListener('click', transformGrid)
    })

    var navBarDropdowns = document.querySelectorAll('.dropdown li')
    navBarDropdowns.forEach(box => {
        box.addEventListener('click', transformGrid)
    })

    var navBarLinks = document.querySelectorAll('.dropdown-text')
    navBarLinks.forEach(link => {
        link.addEventListener('click', transformGrid)
    })
}

function loadJSONFiles()
{
    fetch('./data/countries.json')
    .then(response => response.json())
    .then(function(data) {
        for(let i=0; i<data.length; i++)
        {
            countries.push(data[i])
        }
        return data
    })
    .catch(err => console.log(err))

    fetch('./data/states.json')
    .then(response => response.json())
    .then(function(data) {
        for(let i=0; i<data.length; i++)
        {
            states.push(data[i])
        }
        return data
    })
    .catch(err => console.log(err))

    fetch('./data/cities.json')
    .then(response => response.json())
    .then(function(data) {
        for(let i=0; i<data.length; i++)
        {
            cities.push(data[i])
        }
        return data
    })
    .catch(err => console.log(err))
}

loadJSONFiles()
addClickableToLinkable()
