let ACCOUNTS = []
function loadAccounts () {

    var requestOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        redirect: "follow"
    }

    fetch("https://api.sprout-admin.com/api/accounts", requestOptions)
        .then(response => response.text())
        .then(result =>  ACCOUNTS = JSON.parse(result))
        .catch(error => console.log('error', error))
}

function searchAccount() {
    const input = document.getElementById('search-accounts')
    const container = document.getElementById('account-search-results')
    if(input.value.length < 3) {
        container.innerHTML = ""
        return
    }
    while(container.firstChild) {
        container.removeChild(container.firstChild)
    }
    const searchResults = ACCOUNTS.filter(account => account.cnme.replace(/[^A-Za-z0-9 ]/g, '').toLowerCase().includes(input.value.replace(/[^A-Za-z0-9 ]/g, '').toLowerCase()) || account.id.replace(/[^A-Za-z0-9 ]/g, '').toLowerCase().includes(input.value.replace(/[^A-Za-z0-9 ]/g, '').toLowerCase()))

    let resultsHTML = ''
    searchResults.forEach(account => {
        resultsHTML += `
        <div class="account-item border shadow-sm px-2 py-2 my-3 rounded d-flex justify-content-between" data-id="${account.id}">
            <div class="d-flex my-2 align-items-center">
                <div class="badge" style="background-color: #0FCFC9">
                    ${account.id}
                </div>
                <p class='mb-0 mx-2 fw-bold'>${account.cnme}</p>
            </div>
            <i class="bi bi-arrow-right-circle" style="font-size: 32px"></i>
        </div>`
    })
    container.innerHTML = resultsHTML

    container.childNodes.forEach(node => {
        node.onclick = function() { // Note this is a function
            launchClientConsole(this.dataset.id)
        }
    })
}

function launchClientConsole(id) {
    window.open('https://admin.textripple.com/client-launch.php?id=' + id)
}
loadAccounts()
document.addEventListener('DOMContentLoaded', function () {
    console.log('Content loaded')
    const input = document.getElementById("search-accounts")
    input.addEventListener('keyup', searchAccount)

    // input.addEventListener("onkeydown", function () {
    //     console.log('test')
    // })
})
