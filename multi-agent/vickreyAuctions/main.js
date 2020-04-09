let adBase = null
let slotBase = null
let numAdvertisers = 5
let numSlots = 3
let random = false
let byWhat = null

window.onload = function () {
    adBase = document.getElementById('adBase')
    slotBase = document.getElementById('slotBase')
    this.initialize()
}

function initialize() {
    document.getElementById('addAdvertiserBtn').onclick = function () {
        addAdvertiserRow()
    }
    document.getElementById('addSlotBtn').onclick = function () {
        addSlotRow()
    }
    document.getElementById('generateResultsBtn').onclick = function () {
        doVCG()
    }
    document.getElementById('randomizeBtn').onclick = function () {
        random = true
        randomize()
    }
    document.getElementById('byWhatBtn').onclick = function() {
        const input = document.getElementById('incrementBy')
        if(input) {
            byWhat = input.value
            input.value = ''
            byWhatMethod()
        }
    }
    document.getElementById('wipeWhatBtn').onclick = function() {
        byWhat = null
    }
    generateInitialAdvertisers()
    generateInitialSlots()
    doVCG()
}

//==========================//
//          DO VCG          //
//==========================//

function doVCG() {
    const parent = document.getElementById('resultTable')
    parent.innerHTML = ''
    generateTable(parent)
}

function getHighestBidders() {
    let list = []
    for (let i = 0; i < numAdvertisers; i++) {
        let input = document.getElementById(getInputId('p', i + 1))
        let advertiser = document.getElementById(getInputId('a', i + 1))
        list.push({ advertiser: advertiser.innerHTML, pays: input.value })
    }
    list.sort((a, b) => { return (a.pays < b.pays) ? 1 : ((b.pays < a.pays) ? -1 : 0); });
    pays = generateWhoPaysWhat(list).reverse()

    const tableList = []
    for (let i = 0; i < list.length; i++) {
        tableList.push({
            advertiser: list[i].advertiser,
            pays: pays[i] === undefined ? 0 : pays[i]
        })
    }
    return tableList
}

function getClickCounts() {
    const clicks = []
    for (let i = 0; i < numSlots; i++) {
        clicks.push(document.getElementById(getInputId('c', i + 1)).value)
    }
    return clicks
}

function generateWhoPaysWhat(list) {
    const pays = []
    let pay = 0
    const clicks = getClickCounts()
    for (let i = numSlots - 1; i >= 0; i--) {
        const advertiserPay = list[i + 1].pays
        const firstClick = clicks[i]
        const secondClick = (i === (clicks.length - 1)) ? 0 : clicks[i + 1]
        pay += (firstClick - secondClick) * advertiserPay
        pays.push(Math.ceil(pay))
    }
    return pays
}

//===============================//
//          BUILD TABLE          //
//===============================//
function generateTable(parent) {
    const table = document.createElement('table')
    table.appendChild(generateTableHeader())
    const highestBidders = getHighestBidders()
    for (let i = 0; i < highestBidders.length; i++) {
        const row = generateTableRow(highestBidders[i])
        table.appendChild(row)
    }

    parent.appendChild(table)
}

function generateTableHeader() {
    const headerVals = ['Who Wins', 'Pays']
    const headerRow = document.createElement('tr')
    for (let i = 0; i < headerVals.length; i++) {
        const headerCell = document.createElement('th')
        headerCell.innerHTML = headerVals[i]
        headerRow.appendChild(headerCell)
    }
    return headerRow
}

function generateTableRow(elem) {
    const row = document.createElement('tr')
    for (let i in elem) {
        const cell = document.createElement('td')
        cell.innerHTML = elem[i]
        row.appendChild(cell)
    }
    return row
}

//===============================//
//          BUILD INPUT          //
//===============================//

function generateInitialSlots() {
    slotBase.innerHTML = ''
    for (let i = 0; i < numSlots; i++) {
        const idNum = i + 1
        const row = generateSlotRow(idNum)
        slotBase.appendChild(row)
    }
    fillInitialSlots()
}

function fillInitialSlots() {
    const vals = random ? randomList(100, 1000, numSlots) : [500, 300, 100]
    vals.sort((a, b) => { return (a < b) ? 1 : ((b < a) ? -1 : 0); });
    for (let i = 0; i < numSlots; i++) {
        const input = document.getElementById(getInputId('c', i + 1))
        input.value = vals[i]
    }
}

function addSlotRow() {
    numSlots++
    const row = generateSlotRow(numSlots)
    slotBase.appendChild(row)
}

function generateSlotRow(idNum) {
    const row = document.createElement('div')
    row.classList.add('inputRow')

    const s = document.createElement('p')
    s.innerHTML = "S" + idNum
    s.id = getInputId('s', idNum)
    const c = document.createElement('input')
    c.placeholder = "C" + idNum
    c.id = getInputId('c', idNum)

    row.appendChild(s)
    row.appendChild(c)

    return row
}

function generateInitialAdvertisers() {
    adBase.innerHTML = ''
    for (let i = 0; i < numAdvertisers; i++) {
        const idNum = i + 1
        const row = genAdvertiserRow(idNum)
        adBase.appendChild(row)
    }
    fillInitialAdvertisers()
}

function randomize() {
    let maxSlots = 6
    numSlots = randomNumber(1, maxSlots)

    numAdvertisers = randomNumber(5, 10)
    while (numAdvertisers <= numSlots) {
        numAdvertisers = randomNumber(numSlots, maxSlots + 1)
    }

    generateInitialAdvertisers()
    generateInitialSlots()
    doVCG()
}

function byWhatMethod() {
    generateInitialAdvertisers()
    generateInitialSlots()
    doVCG()
}

function fillInitialAdvertisers() {
    const vals = (random || (byWhat != null)) ? randomList(.100, 10, numAdvertisers) : [.5, .4, .3, .2, .1]
    vals.sort((a, b) => { return (a < b) ? 1 : ((b < a) ? -1 : 0); });
    for (let i = 0; i < numAdvertisers; i++) {
        const input = document.getElementById(getInputId('p', i + 1))
        input.value = vals[i]
    }
}

function randomList(min, max, numVals) {
    const rands = []
    if(byWhat) {
        let firstNum = parseFloat(randomNumber(min, max))
        rands.push(firstNum)
        for(let i = 0; i < numVals - 1; i++) {
            firstNum += parseFloat(byWhat)// byWhat
            rands.push(firstNum)
        }
    }
    else {
        for (let i = 0; i < numVals; i++) {
            rands.push(randomNumber(min, max))
        }
    }
    return rands
}

function randomNumber(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min).toFixed(2)
}

function genAdvertiserRow(idNum) {
    const rowElem = document.createElement('div')
    rowElem.classList.add('inputRow')

    const a = document.createElement('p')
    a.innerHTML = "A" + idNum
    a.id = getInputId('a', idNum)
    const p = document.createElement('input')
    p.placeholder = "P" + idNum
    p.id = getInputId('p', idNum)

    rowElem.appendChild(a)
    rowElem.appendChild(p)
    return rowElem
}

function getInputId(type, number) {
    return (type + "-" + number)
}

function addAdvertiserRow() {
    numAdvertisers++
    const row = genAdvertiserRow(numAdvertisers)
    adBase.appendChild(row)
}