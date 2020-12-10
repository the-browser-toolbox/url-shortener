const apiKey = 'YOUR_API_TOKEN' //go to https://developers.rebrandly.com/docs/get-started

const url = 'https://api.rebrandly.com/v1/links'
const displayShortUrl = (event) => {
    event.preventDefault()
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild) //remove all the previously appended child
    }
    getCurrentTab()
}
const getCurrentTab = () => {
    //get the currently active tab
    if (chrome) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (arrayOfTabs) => {
            // qrcode.clear() // clear the code.
            shortenUrl(arrayOfTabs.length > 0 ? arrayOfTabs[0].url : 'googl.com')
        })
    } else {
        browser.tabs.query({ active: true, currentWindow: true }).then((tab) => {
            shortenUrl(logCurrentTabData === undefined ? 'err' : logCurrentTabData.url)
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
// Some page elements
const inputField = document.querySelector('#input')
const shortenButton = document.querySelector('#shorten')
const responseField = document.querySelector('#responseField')
const shortenUrl = (urlToShorten) => {
    const data = JSON.stringify({ destination: urlToShorten })
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            renderResponse(xhr.response)
        }
    }
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('apikey', apiKey)
    xhr.send(data)
}

shortenButton.addEventListener('click', displayShortUrl) //Start request
