const apiKey = 'YOUR_API_TOKEN' //go to https://developers.rebrandly.com/docs/get-started
const apiUrl = 'https://api.rebrandly.com/v1/links'
// Some page elements
const Qrcodefield = document.getElementById('qrcode_pane')
const shortenButton = document.getElementById('shorten')
const responseField = document.getElementById('responseField')

const displayShortUrl = (event) => {
    event.preventDefault()
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild) //remove all the previously appended child
    }
    getCurrentTab()
}
const QRgen = (currentURL) => {
    var qrcode = new QRCode({
        content: currentURL,
        container: 'svg-viewbox', //Responsive use
        join: true, //Crisp rendering and 4-5x reduced file size
    })
    var svg = qrcode.svg()
    Qrcodefield.innerHTML = svg
}
const getCurrentTab = () => {
    //get the currently active tab
    let currentURL = ''
    if (chrome) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (arrayOfTabs) => {
            currentURL = arrayOfTabs.length > 0 ? arrayOfTabs[0].url : 'ERROr in getting URL '
            shortenUrl(currentURL)
            QRgen(currentURL)
        })
    } else {
        browser.tabs.query({ active: true, currentWindow: true }).then((tab) => {
            currentURL = logCurrentTabData === undefined ? 'ERROr in getting URL ' : logCurrentTabData.url
            shortenUrl(currentURL)
            QRgen(currentURL)
        })
    }
}

const renderResponse = (res) => {
    // Displays either message depending on results
    if (res.errors) {
        responseField.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>"
    } else {
        responseField.innerHTML = `<p>Your shortened url is: </p><p> ${res.shortUrl} </p>`
    }
}

const shortenUrl = async (urlToShorten) => {
    const data = JSON.stringify({ destination: urlToShorten })
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json',
                apikey: apiKey,
            },
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            renderResponse(jsonResponse)
        }
    } catch (error) {
        console.log(error)
    }
}

shortenButton.addEventListener('click', displayShortUrl) //Start request
