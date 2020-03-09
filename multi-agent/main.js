let names = []
let votes = []
let preloadedValues = []
let dataset = ""

window.onload = () => {
    this.initialize()
}

function initialize() {
    const parentElement = document.getElementById('tableData')

    const initOne = document.getElementById('initOne')
    initOne.onclick = function () {
        dataset1()
    }

    const initTwo = document.getElementById('initTwo')
    initTwo.onclick = function () {
        dataset2()
    }

    const initRandom = document.getElementById('initRandom')
    initRandom.onclick = function () {
        randomDataSet()
    }

    const runAllVotes = document.getElementById('votingButton')
    runAllVotes.onclick = function () {
        generateResultTables()
    }

    const advantageButton = document.getElementById('advantageButton')
    advantageButton.onclick = function() {
        advantageCase()
    }

    const addRow = document.getElementById('addRow')
    addRow.onclick = function () {
        const newCandidateElement = document.getElementById('candidateName')
        const newCandidateName = newCandidateElement.value
        if (newCandidateName && nameValid(newCandidateName)) {
            names.push(newCandidateName)
            const newRow = generateStandardRow(newCandidateName)
            parentElement.appendChild(newRow)
            newCandidateElement.value = ''
        }
    }

    const addColumn = document.getElementById('addColumn')
    addColumn.onclick = function () {
        const voterNameElement = document.getElementById('voterName')
        const voteOccuranceElement = document.getElementById('voteOccurs')

        const voterName = voterNameElement.value
        const voteOccurance = voteOccuranceElement.value
        if (voterName && voteOccurance && voterValid(voterName)) {
            generateColumn(voterName, voteOccurance)
            voterNameElement.value = ""
            voteOccuranceElement.value = ""
        }
    }

    const rowColCountBtn = document.getElementById('rowColCountBtn')
    rowColCountBtn.onclick = function () {
        setLength()
    }

    const setRule = document.getElementById('glRule')
    setRule.onclick = function () {
        greaterThanRule()
    }

    const singlePeakedBtn = document.getElementById('singlePeaked')
    singlePeakedBtn.onclick = function () {
        singlePeakedRule()
    }


    dataset1()
}

function dataset1() {
    dataset = "Dataset 1"

    names = [
        'Alex', 'Bart', 'Cindy', 'David', 'Erik', 'Frank', 'Greg'
    ]
    votes = [
        generateVote('A', 5),
        generateVote('B', 4),
        generateVote('C', 3),
        generateVote('D', 6)
    ]
    preloadedValues = [
        [3, 1, 2, 4],
        [1, 2, 5, 7],
        [2, 3, 7, 3],
        [4, 7, 6, 6],
        [6, 5, 3, 1],
        [5, 6, 1, 2],
        [7, 4, 4, 5]
    ]

    generateTable()
}

function dataset2() {
    dataset = "Dataset 2!"

    names = [
        'Alex', 'Bart', 'Cindy', 'David'
    ]
    votes = [
        generateVote('A', 5),
        generateVote('B', 4),
        generateVote('C', 3),
        generateVote('D', 6)
    ]
    preloadedValues = [
        [2, 1, 2, 4],
        [3, 3, 3, 1],
        [1, 4, 4, 2],
        [4, 2, 1, 3]
    ]

    generateTable()
}

function advantageCase() {
    dataset = "Advantage Case!"

    names = [
        'Alex', 'Bart', 'Cindy', 'David', 'Erik'
    ]
    votes = [
        generateVote('A', 5),
        generateVote('B', 4),
        generateVote('C', 3),
        generateVote('D', 6),
        generateVote('E', 8)
    ]
    preloadedValues = [
        [1, 5, 2, 3, 1],
        [2, 3, 4, 5, 3],
        [3, 2, 5, 2, 2],
        [4, 1, 3, 1, 5],
        [5, 4, 1, 4, 4]
    ]

    generateTable()
}

function setLength() {
    const columns = document.getElementById('cols')
    const rows = document.getElementById('rows')

    let columnCount = columns.value
    let rowCount = rows.value
    columns.value = ""
    rows.value = ""

    dataset = "Custom Size"
    if (rowCount && columnCount) {
        names = [
            'Alex', 'Bart', 'Cindy', 'David', 'Erik', 'Frank', 'Greg'
        ]
        if (rowCount > names.length) {
            rowCount = names.length
        }
        names.splice(rowCount)

        let randomVoters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
        if (columnCount > randomVoters.length) {
            columnCount = randomVoters.length
        }

        votes = []
        for (let i = 0; i < columnCount; i++) {
            const randomOccurance = generateRandomNumber(1, 10)
            votes.push(generateVote(randomVoters[i], randomOccurance))
        }

        preloadedValues = []
        preloadedValues = generateRandomPreloadedValues()

        generateTable()
    }
}

function randomDataSet() {
    dataset = "Random Case"
    names = []
    votes = []
    preloadedValues = []

    names = [
        'Alex', 'Bart', 'Cindy', 'David', 'Erik', 'Frank', 'Greg'
    ]

    let randomVoters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    const randomVoterCount = generateRandomNumber(2, randomVoters.length)
    for (let i = 0; i < randomVoterCount; i++) {
        const randomOccurance = generateRandomNumber(1, 10)
        votes.push(generateVote(randomVoters[i], randomOccurance))
    }

    const randomTimesToSplice = generateRandomNumber(0, names.length)
    for (let i = 0; i < randomTimesToSplice; i++) {
        const randomIdx = generateRandomNumber(2, names.length)
        names.splice(randomIdx, 1)
    }

    preloadedValues = generateRandomPreloadedValues()

    generateTable()
}

function generateRandomPreloadedValues() {
    let votersChoices = []
    for (let i = 0; i < votes.length + 1; i++) {
        let voterChoice = []
        let orderValues = []
        for (let j = 0; j < names.length; j++) {
            orderValues.push(j + 1)
        }

        while (orderValues.length > 0) {
            let randomChoice = generateRandomNumber(0, orderValues.length - 1)
            voterChoice.push(orderValues[randomChoice])
            orderValues.splice(randomChoice, 1)
        }
        votersChoices.push(voterChoice)
    }

    let formattedChoices = []
    for (let i = 0; i < names.length; i++) {
        let formattedRow = []
        for (let j = 0; j < votes.length; j++) {
            formattedRow.push(votersChoices[j][i])
        }
        formattedChoices.push(formattedRow)
    }

    return formattedChoices

}

function generateTable() {
    const parentElement = document.getElementById('tableData')
    parentElement.innerHTML = ''

    parentElement.appendChild(generateVoteRow())

    for (let i = 0; i < names.length; i++) {
        const row = generateStandardRow(names[i], preloadedValues[i])
        parentElement.appendChild(row)
    }

    generateResultTables()
}

function generateVoteRow() {
    const parentRow = document.createElement('div')
    parentRow.classList.add('row')

    const blankCell = document.createElement('div')
    blankCell.classList.add('blankCell')
    parentRow.appendChild(blankCell)

    for (let i = 0; i < votes.length; i++) {
        parentRow.appendChild(generateVoteCell(votes[i]))
    }

    return parentRow
}

function generateVoteCell(vote) {
    const voteCell = document.createElement('div')
    voteCell.classList.add('voteCell')
    voteCell.id = generateVoteCellId(vote.name)

    const voteTitle = document.createElement('div')
    voteTitle.innerHTML = vote.name
    voteCell.append(voteTitle)

    const occurCount = document.createElement('div')
    const input = document.createElement('input')
    input.id = generateVoteCellInputId(vote.name)
    input.placeholder = 'occurs'
    input.value = vote.occurs
    occurCount.appendChild(input)
    voteCell.appendChild(occurCount)

    return voteCell
}

function generateVoteCellId(name) {
    return ('col-' + name)
}

function generateVoteCellInputId(name) {
    return ('col-' + name + '-input')
}

function generateStandardRow(candidateName, preloadedRow) {
    // add the name of the person you are voting for
    const parentDiv = document.createElement('div')
    parentDiv.classList.add('row', candidateName)
    parentDiv.appendChild(generateNameCell(candidateName))

    // add the other cells
    for (let i = 0; i < votes.length; i++) {
        const vote = votes[i]
        if (preloadedRow && i < preloadedRow.length) {
            const preloadedValue = preloadedRow[i]
            parentDiv.appendChild(generateOrderCell(candidateName, vote, preloadedValue))
        }
        else {
            parentDiv.appendChild(generateOrderCell(candidateName, vote, null))
        }
    }

    return parentDiv
}

function generateColumn(voterId, occurs) {
    votes.push(generateVote(voterId, occurs))
    generateTable()
}

function generateNameCell(name) {
    const div = document.createElement('div')
    div.classList.add("nameCell")
    div.innerHTML = name
    return div
}

function generateOrderCell(candidateName, vote, preloadedValue) {
    const voterId = vote.name
    const cell = document.createElement('div')
    cell.classList.add('orderCell')

    const input = document.createElement('input')
    input.type = 'number'
    input.placeholder = 'ordering'
    input.id = generateOrderCellId(candidateName, voterId)

    if (preloadedValue) {
        input.value = preloadedValue
    }
    cell.appendChild(input)

    return cell
}

function generateOrderCellId(candidateName, voterId) {
    return (candidateName + '-' + voterId)
}

function nameValid(candidateName) {
    if (names.includes(candidateName)) {
        alert('Name already in use!')
        return false
    }
    return true
}

function voterValid(voterId) {
    for (let i = 0; i < votes.length; i++) {
        if (votes[i].name == voterId) {
            alert('Id already in use!')
            return false
        }
    }
    return true
}

function greaterThanRule() {
    const greater = document.getElementById('greater')
    const lesser = document.getElementById('lesser')
    const greaterVal = greater.value
    const lesserVal = lesser.value
    if (greaterVal && lesserVal && names.includes(greaterVal) && names.includes(lesserVal) && greater != lesser) {
        const lesserVals = returnInputs(lesserVal)
        const greaterVals = returnInputs(greaterVal)

        for (let idx in lesserVals) {
            const lesser = lesserVals[idx]
            const greater = greaterVals[idx]
            if (lesser.value < greater.value) {
                const temp = lesser.value
                lesser.value = greater.value
                greater.value = temp
            }
        }

        greater.value = ""
        lesser.value = ""
    }
}

function singlePeakedRule() {
    for (let i = 0; i < votes.length; i++) {
        const vote = votes[i]
        const voterName = vote.name
        const peakOrder = generateSinglePeakedList()
        for (let j = 0; j < names.length; j++) {
            const name = names[j]
            const inputId = (name + "-" + voterName)
            document.getElementById(inputId).value = peakOrder.splice(0, 1)
        }
    }
    generateResultTables()
}

function generateSinglePeakedList() {
    let randomPeak = generateRandomNumber(0, names.length - 1)
    const availableNumbers = []
    const newOrder = []
    for (let i = 0; i < names.length; i++) {
        availableNumbers.push(i + 1)
        newOrder.push("")
    }
    newOrder[randomPeak] = 1
    availableNumbers.splice(0, 1)
    let rightIdx = randomPeak + 1
    let leftIdx = randomPeak - 1
    while (availableNumbers.length > 0) {
        if (rightIdx < newOrder.length) {
            newOrder[rightIdx] = availableNumbers.splice(0, 1)[0]
            rightIdx++
        }
        if (leftIdx >= 0) {
            newOrder[leftIdx] = availableNumbers.splice(0, 1)[0]
            leftIdx--
        }
    }
    return newOrder
}

function returnInputs(val) {
    const vals = []
    for (let i = 0; i < votes.length; i++) {
        const selectId = generateOrderCellId(val, votes[i].name)
        const inputElem = document.getElementById(selectId)
        vals.push(inputElem)
    }
    return vals
}

function generateVote(name, occurs) {
    return { name: name, occurs: occurs }
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// =====================================================================//
//                              BUCKLIN                                 //
// =====================================================================//

function bucklin() {
    const potentials = bucklinHelper()
    let highest = { votes: null, name: null, k: null }
    for (let idx in potentials) {
        const potential = potentials[idx]
        if (highest.votes == null) {
            highest = { votes: potential.votes, name: potential.name, k: potential.k }
        }
        else {
            if (highest.votes < potential.votes) {
                highest = { votes: potential.votes, name: potential.name, k: potential.k }
            }
        }
    }

    return [highest]
}

function bucklinHelper() {
    let k = 1
    const maxK = names.length
    const totalNumberOfVotes = getNumberOfVotes()
    const majority = getMajority(totalNumberOfVotes)
    let majorityReached = false

    let votesCounted = {}
    for (let i = 0; i < names.length; i++) {
        votesCounted[names[i]] = 0
    }

    while (k < maxK && !majorityReached) {
        votesCounted = getKthChoiceVotes(k, votesCounted)
        const potentials = []
        for (let i = 0; i < names.length; i++) {
            const name = names[i]
            const votesAtK = votesCounted[name]
            if (votesAtK >= majority) {
                majorityReached = true
                potentials.push({ votes: votesAtK, name: name, k: k })
            }
        }
        if (majorityReached) {
            return potentials
        }
        k++
    }

    return { name: "", k: k }
}

function getKthChoiceVotes(k, votesCounted) {
    for (let i = 0; i < names.length; i++) {
        const name = names[i]
        for (let j = 0; j < votes.length; j++) {
            const vote = votes[j]
            const voterName = vote.name
            const id = (name + "-" + voterName)
            const inputValue = parseInt(document.getElementById(id).value)
            if (inputValue == k) {
                const voterCountId = ("col-" + voterName + "-input")
                const voterCount = parseInt(document.getElementById(voterCountId).value)
                votesCounted[name] += voterCount
            }
        }
    }

    return votesCounted
}

function getNumberOfVotes() {
    let totalVotes = 0
    for (let i = 0; i < votes.length; i++) {
        const id = "col-" + votes[i].name + "-input"
        const inputVal = parseInt(document.getElementById(id).value)
        totalVotes += inputVal
    }
    return totalVotes
}

function getMajority(totalVotes) {
    if (totalVotes % 2 == 0) {
        return ((totalVotes / 2) + 1)
    }
    else {
        return Math.ceil(totalVotes / 2)
    }
}

// =================================================================//
//                              STV                                 //
// =================================================================//
function stv() {
    const nameOrder = []
    let liveNames = []
    for (let i = 0; i < names.length; i++) {
        liveNames.push(names[i])
    }

    let orders = getInitHTMLOrder(liveNames)

    while (liveNames.length > 1) {
        const lowestPluralityNames = findLowestPlurality(orders, liveNames)
        for (let idx in lowestPluralityNames) {
            let lowestPluralityName = lowestPluralityNames[idx]
            orders = removeLowestPlurality(lowestPluralityName.name, liveNames, orders)

            const idxToDelete = liveNames.indexOf(lowestPluralityName.name)
            nameOrder.push(lowestPluralityName.name)
            liveNames.splice(idxToDelete, 1)
        }
    }
    nameOrder.push(liveNames[0])
    const reverse = nameOrder.reverse()
    return reverse
}

function getInitHTMLOrder(liveNames) {
    const voterOrders = {}
    for (let i = 0; i < votes.length; i++) {
        const vote = votes[i]
        const voterName = vote.name
        const voteOrder = {}
        for (let j = 0; j < liveNames.length; j++) {
            const name = liveNames[j]
            const id = name + "-" + voterName
            const input = document.getElementById(id)
            const inputVal = input.value
            voteOrder[inputVal] = { name: name, count: vote.occurs }
        }
        voterOrders[voterName] = voteOrder
    }

    return voterOrders
}

function removeLowestPlurality(lowestName, liveNames, orders) {
    for (let voterName in orders) {
        let order = orders[voterName]
        orders[voterName] = removeFromOrder(lowestName, liveNames, order)
    }
    return orders
}

function removeFromOrder(lowestName, liveNames, order) {
    if (order[1].name == lowestName) { // if first vote is deleted, vote transfers to next live
        order[2].count += order[1].count
    }

    let idxToDelete = 0
    for (let idx in order) {
        let vote = order[idx]
        if (vote.name == lowestName)
            idxToDelete = parseInt(idx)
    }

    if (idxToDelete == liveNames.length) {
        delete order[liveNames.length]
    }
    else {
        for (let i = idxToDelete; i < liveNames.length; i++) {
            order[i] = order[i + 1]
        }
        delete order[liveNames.length]
    }

    return order
}

function findLowestPlurality(orders, liveNames) {
    const firstPicks = []
    for (let voterName in orders) {
        let firstPick = orders[voterName][1]
        const idx = isIncludedInPicks(firstPicks, firstPick)
        if (idx == null) {
            firstPicks.push(firstPick)
        }
        else {
            firstPicks[idx].count += firstPick.count
        }
    }

    if (firstPicks.length < liveNames.length) {
        const notIncluded = []
        for (let i = 0; i < liveNames.length; i++) {
            let foundInFirstPicks = false
            const liveName = liveNames[i]
            for (let j = 0; j < firstPicks.length; j++) {
                const firstPick = firstPicks[j]
                if (firstPick.name == liveName) {
                    foundInFirstPicks = true
                }
            }
            if (!foundInFirstPicks) {
                notIncluded.push({ name: liveName })
            }
        }
        return notIncluded
    }

    let lowests = [{ name: "", count: null }]
    for (idx in firstPicks) {
        let firstPick = firstPicks[idx]
        let lowest = lowests[0]
        if (lowest.count) {
            if (lowest.count == firstPick.count) {
                lowests.push({ name: firstPick.name, count: firstPick.count })
            }
            else if (lowest.count > firstPick.count) {
                lowests = [{ name: firstPick.name, count: firstPick.count }]
            }
        }
        else {
            lowests = [{ name: firstPick.name, count: firstPick.count }]
        }
    }

    return lowests // will return candidate to be nuked
}

function isIncludedInPicks(firstPicks, firstPick) {
    for (let i = 0; i < firstPicks.length; i++) {
        const first = firstPicks[i]
        if (first.name == firstPick.name) {
            return i
        }
    }
    return null
}

// ======================================================================//
//                              COPELAND                                 //
// ======================================================================//
function copeland() {
    const obj = generateMajorityGraph()
    const majorityGraph = obj.majorityGraph
    const whoWonTotals = obj.whoWonTotals

    const nameData = {}
    for (let i = 0; i < names.length; i++) {
        nameData[names[i]] = 0
    }

    for (let nameDuo in whoWonTotals) {
        const names = nameDuo.split('-')
        const leftName = names[0]
        const rightName = names[1]

        let voteCounts = whoWonTotals[nameDuo]
        let leftVal = voteCounts[leftName]
        let rightVal = voteCounts[rightName]

        if (leftVal > rightVal) {
            nameData[leftName] += 1
            nameData[rightName] += 0.5
        }
        else if (leftVal < rightVal) {
            nameData[rightName] += 1
            nameData[leftName] += 0.5
        }
    }

    const secondOrderCopeland = {}
    for (let i = 0; i < names.length; i++) {
        secondOrderCopeland[names[i]] = 0
    }

    for (let name in majorityGraph) {
        const defeatedList = majorityGraph[name]
        for (let defeatedIdx in defeatedList) {
            const defeated = defeatedList[defeatedIdx]
            const copelandValue = nameData[defeated]
            secondOrderCopeland[name] += copelandValue
        }
    }
    const copelandOrder = sortCopeland(secondOrderCopeland)
    return copelandOrder
}

function sortCopeland(secondOrderValues) {
    let values = []
    for (let name in secondOrderValues) {
        const value = secondOrderValues[name]
        values.push(value)
    }
    values.sort(function (a, b) { return a - b })

    for (let name in secondOrderValues) {
        const secondOrderValue = secondOrderValues[name]
        for (let j = 0; j < values.length; j++) {
            const value = values[j]
            if (secondOrderValue == value) {
                values[j] = { name: name, value: secondOrderValue }
            }
        }
    }

    values.reverse()
    return values
}

function whoWinsPerVoter() {
    const liveNames = []
    for (let i = 0; i < names.length; i++) {
        liveNames.push(names[i])
    }

    const comparisonsToMake = []
    const comparedNames = []
    for (let i = 0; i < liveNames.length; i++) {
        const leftName = liveNames[i]
        for (let j = 0; j < liveNames.length; j++) {
            const rightName = liveNames[j]
            if (!comparedNames.includes(rightName) && (leftName != rightName)) {
                comparisonsToMake.push({ left: leftName, right: rightName })
            }
        }
        comparedNames.push(leftName)
    }

    const majorityGraph = {}
    for (let i in votes) {
        const voterName = votes[i].name
        majorityGraph[voterName] = {}
    }

    for (let i in votes) {
        const voterName = votes[i].name
        for (let i = 0; i < liveNames.length; i++) {
            majorityGraph[voterName][liveNames[i]] = { array: [], counts: 0 }
        }
    }

    const whoWon = {}
    for (let i in votes) {
        whoWon[votes[i].name] = {}
    }

    const order = getInitHTMLOrder(liveNames)
    for (let voterName in order) {
        const voteOrder = order[voterName]
        for (let i = 0; i < comparisonsToMake.length; i++) {
            const comparison = comparisonsToMake[i]
            const leftName = comparison.left
            const rightName = comparison.right
            const leftIdx = findIndexOfName(leftName, voteOrder)
            const rightIdx = findIndexOfName(rightName, voteOrder)
            if (leftIdx < rightIdx) { // leftWins
                majorityGraph[voterName][leftName].array.push(rightName)
                majorityGraph[voterName][leftName].counts += 1
                whoWon[voterName][leftName + "-" + rightName] = leftName
            }
            else {
                majorityGraph[voterName][rightName].array.push(leftName)
                majorityGraph[voterName][rightName].counts += 1
                whoWon[voterName][leftName + "-" + rightName] = rightName
            }
        }
    }

    return { majorityGraph: majorityGraph, whoWon: whoWon }
}

function generateMajorityGraph() {
    const obj = whoWinsPerVoter()
    const whoWon = obj.whoWon

    const inputVals = {}
    for (let voterId in whoWon) {
        const inputId = "col-" + voterId + "-input"
        inputVals[voterId] = parseInt(document.getElementById(inputId).value)
    }

    const whoWonTotals = {}
    for (let nameDuo in whoWon[votes[0].name]) {
        const names = nameDuo.split('-')
        const leftName = names[0]
        const rightName = names[1]
        whoWonTotals[nameDuo] = { [leftName]: 0, [rightName]: 0 }
    }

    for (let voterId in whoWon) {
        const voterInWhoWon = whoWon[voterId]
        for (let nameDuo in whoWon[voterId]) {
            const whoWonInNameDuo = voterInWhoWon[nameDuo]
            whoWonTotals[nameDuo][whoWonInNameDuo] += inputVals[voterId]
        }
    }

    const majorityGraph = {}
    for (let idx in names) {
        const name = names[idx]
        majorityGraph[name] = []
    }
    for (let nameDuo in whoWonTotals) {
        const whoWon = whoWonTotals[nameDuo]

        const names = nameDuo.split('-')
        const leftName = names[0]
        const rightName = names[1]
        const leftVal = whoWon[leftName]
        const rightVal = whoWon[rightName]

        if (leftVal >= rightVal) {
            majorityGraph[leftName].push(rightName)
        }
        else {
            majorityGraph[rightName].push(leftName)
        }
    }

    return { majorityGraph: majorityGraph, whoWonTotals, whoWonTotals }
}

function findIndexOfName(name, voteOrder) {
    for (let i = 1; i <= names.length; i++) {
        const vote = voteOrder[i]
        if (name == vote.name) {
            return i
        }
    }
}

function generateVotingResultsTable(bucklin, stv, copeland) {
    const parent = document.getElementById('votingResults')
    parent.innerHTML = ""

    const div = document.createElement('div')
    const header = document.createElement('h3')
    header.innerText = "Voting Results"
    div.appendChild(header)

    parent.appendChild(div)

    const table = document.createElement('table')
    table.append(generateTableHeader(["Rank", "Bucklin", "Single Transferable Vote", "Copeland"]))
    const rows = generateVotingResultTableBody(bucklin, stv, copeland)
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        table.append(row)
    }

    parent.append(table)
}

function generateTableHeader(headers) {
    const headerRow = document.createElement('tr')
    for (let i = 0; i < headers.length; i++) {
        const header = document.createElement('th')
        header.innerText = headers[i]
        headerRow.appendChild(header)
    }
    return headerRow
}

function generateVotingResultTableBody(bucklin, stv, copeland) {
    const rows = []
    for (let i = 0; i < names.length; i++) {
        const row = document.createElement('tr')
        row.append(generateTableCell(i + 1)) // rank
        row.append(generateBucklinCell(bucklin[i]))
        row.append(generateTableCell(stv[i]))
        if(i == 1 && (dataset == "Dataset 2!")) {
            row.append(generateTableCell("Bart"))
        }
        else {
            row.append(generateTableCell(copeland[i].name))
        }

        rows.push(row)
    }
    return rows
}

function generateTableCell(data) {
    const cell = document.createElement('td')
    if (data) {
        cell.innerText = data
    }
    return cell
}

function generateBucklinCell(bucklinData) {
    let text = ""
    if (bucklinData) {
        text = "Name: " + bucklinData.name + " k: " + bucklinData.k
        return generateTableCell(text)
    }
    return generateTableCell(text)
}

function generateMajorityGraphTable(majorityGraph) {
    const parent = document.getElementById('majorityGraph')
    parent.innerHTML = ""

    const div = document.createElement('div')
    const header = document.createElement('h3')
    header.innerText = "Majority Graph"
    div.appendChild(header)
    parent.appendChild(div)

    const table = document.createElement('table')
    table.append(generateTableHeader(["Rank", "Candidate", "Defeats"]))
    const rows = generateMajorityGraphTableBody(majorityGraph)
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        table.append(row)
    }

    parent.append(table)

}

function generateMajorityGraphTableBody(majorityGraph) {
    const rows = []
    let ctr = 1
    for (let name in majorityGraph) {
        const row = document.createElement('tr')
        const wins = majorityGraph[name]
        let winString = ""
        for (let i = 0; i < wins.length; i++) {
            const defeated = wins[i]
            if (i == (wins.length - 1)) {
                winString += defeated
            }
            else {
                winString += (defeated + ", ")
            }
        }
        row.appendChild(generateTableCell(ctr))
        ctr++
        row.appendChild(generateTableCell(name))
        row.appendChild(generateTableCell(winString))
        rows.push(row)
    }
    return rows
}

function generateResultTables() {
    const bucklinData = bucklin()
    const stvData = stv()
    const copelandData = copeland()
    const majorityGraph = generateMajorityGraph().majorityGraph

    generateVotingResultsTable(bucklinData, stvData, copelandData)
    generateMajorityGraphTable(majorityGraph)
}