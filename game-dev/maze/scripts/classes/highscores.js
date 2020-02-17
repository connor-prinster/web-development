class Highscores {
    constructor() {
        this.storageKey = 'maze-highScores'
        this.highscores = this.retrievePrevious()
    }

    retrievePrevious() {
        let toReturn = []
        let previousScores = localStorage[this.storageKey]

        if (previousScores) {
            let highscores = JSON.parse(previousScores).highscores
            for(let idx in highscores) {
                toReturn.push(highscores[idx])
            }
        }
        return toReturn
    }

    add(value) {
        value.key = this.makeKey(value)
        this.highscores.push(JSON.stringify(value))
        localStorage[this.storageKey] = JSON.stringify({highscores: this.highscores})
    }

    makeKey(obj) {
        const spacedKey = (obj.totalTime + obj.difficulty + obj.timeCompleted + obj.score + Math.random())
        return spacedKey.replace(" ", "").replace(" ", "")
    }

    getHighest(scores) {
        const difficulties = {
            easy: "5 x 5",
            medium: "10 x 10",
            hard: "15 x 15",
            insane: "20 x 20"
        }

        let partitioned = { easy: [], medium: [], hard: [],
            insane: []
        }

        for(let idx in scores) {
            const score = JSON.parse(scores[idx])
            if(score.difficulty == difficulties.easy) {
                partitioned.easy.push(score)
            }
            else if (score.difficulty == difficulties.medium){
                partitioned.medium.push(score)
            }
            else if (score.difficulty == difficulties.hard){
                partitioned.hard.push(score)
            }
            else if (score.difficulty == difficulties.insane){
                partitioned.insane.push(score)
            }
        }

        let highest = []

        highest.push(
            this.difficultyMax(partitioned.easy, difficulties.easy),
            this.difficultyMax(partitioned.medium, difficulties.medium),
            this.difficultyMax(partitioned.hard, difficulties.hard),
            this.difficultyMax(partitioned.insane, difficulties.insane)
        )

        return highest
    }

    difficultyMax(diffArr, diffStr) {
        if(diffArr.length > 0) {
            let max = {val: 0, idx: -1}
            for(let idx in diffArr) {
                let val = diffArr[idx]
                if(val.score > max.val) {
                    max.val = val
                    max.idx = idx
                }
            }
            let highest = max.val
            return ('Difficulty: ' + highest.difficulty + '&#10;Score: ' + highest.score + '&#10;Time: ' + highest.timeCompleted)
        }
        else {
            return ("No Scores for " + diffStr)
        }

    }

    remove(key) {
        delete highScores[key];
        localStorage[this.storageKey] = JSON.stringify(highScores);
    }

    generateHighestScoresDiv(highscores) {
        let highests = document.getElementById('highest-scores')
        highests.innerHTML = ''
        const highestScores = this.getHighest(highscores)

        let highScoreText = document.createElement('p')
        highScoreText.classList.add('highscore-text')
        highScoreText.classList.add('highscore-hm')
        highScoreText.innerHTML = "Highest Scores"
        highests.appendChild(highScoreText)
        
        for(let key in highestScores) {
            let div = document.createElement('div')
            div.classList.add('highscore-text')
            div.style.whiteSpace = 'pre-wrap'
            div.innerHTML = (highestScores[key])
            highests.appendChild(div)
        }
    }

    reportToNode() {
        let htmlNode = document.getElementById('highscore-text-box');
        htmlNode.innerHTML = ''
        this.generateHighestScoresDiv(this.highscores)
        
        let highscoreHeader = document.createElement("div"); 
        highscoreHeader.classList.add('highscore-hm')
        highscoreHeader.style.whiteSpace = 'pre-wrap'
        highscoreHeader.innerHTML = "Honorable Mentions:"
        htmlNode.appendChild(highscoreHeader) 

        for (let key in this.highscores) {
            let highscore = JSON.parse(this.highscores[key])
            let div = document.createElement("div"); 
            div.style.whiteSpace = 'pre-wrap'
            div.innerHTML = ('Difficulty: ' + highscore.difficulty + ' Score: ' + highscore.score + ' Time: ' + highscore.timeCompleted+ '<br/><br/>')
            htmlNode.appendChild(div) 
        }
    }
}