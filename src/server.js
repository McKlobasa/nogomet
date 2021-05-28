const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const csv = require('csv-parser')
const net = require('net')
const readCsv = require('./serverModules/csvParseToArray')

const Commands = require('./serverModules/VizProjectSpecificCommands')

const app = express()
const port = 4545
app.use(bodyParser.json())

const VIZ_port = 6100
const VIZ_ip = 'viz01'
const client = new net.Socket()
client.connect(VIZ_port, VIZ_ip, () => console.log(`connected to ${VIZ_ip}:${VIZ_port}`))


let lineupA = []
let lineupB = []
let gameData = [{
  trenerImeA: '',
  trenerPriimekA: '',
  trenerImeB: '',
  trenerPriimekB: '',
  sodnik1: '',
  country1: '',
  sodnik2: '',
  country2: '',
  sodnik3: '',
  country3: '',
  sodnik4: '',
  country4: '',
  komentator: '',
  kraj: '',
  datum: '',
  teamA: '',
  teamB: '',
  logoA: '',
  logoB: ''
}]
let clock = []
let clockIsIn = false
let exitCommand = ''
let score = [0,0]
let izkIn = [0,0]
let currentPlayer = {
  number: '10',
  surname: 'priimek',
  name: 'ime',
  isTeamA: 0,
  goals: 0,
  shots: 0,
  attempts: 0,
  fouls: 0
}
let matchscoreIsIn = false
let countdownIsIn = false
let foulsIn = [0,0]
let tactical = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

let stats = {
  attempts:  [1, 0],
  ballPoss:  [0, 0],
  completed: [0, 0],
  corners:   [0, 0],
  offsides:  [0, 0],
  fouls:     [[0,0], [0,0]],
  goals:     [0, 0],
  passed:    [0, 0],
  reds:      [[0,0], [0,0]],
  shots:     [1, 0],
  yellows:   [[0,0], [0,0]]
}
let players = {
  home: [],
  away: []
}

const playGraphics = (graphics, delays) => {
  graphics.map((gfx, i) => {
    setTimeout( () => {
      console.log(gfx)
      client.write(gfx)
    }, delays[i])
  })
}

const playSingleGraphic = (gfx) => {
  client.write(gfx)
  console.log(gfx)
}



app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/score/:a/:b', (req, res) => {
  res.send('score')
  score = [req.params.a, req.params.b]
  playSingleGraphic(Commands.setScore(score))
})
/*
    case 0: return '1'
    case 1: return 'HALF TIME'
    case 2: return '2'
    case 3: return 'EXTRA 1'
    case 4: return 'EXTRA 2'
    case 5: return 'FULL TIME'
    case 6: return 'END OF 2nd HALF'
*/
let halftime = 0
app.get('/halftime/:time', (req, res) => {
  res.send('halftime')
  halftime = Number(req.params.time)
  console.log(halftime)
})
app.get('/GFX_out', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(exitCommand)
  matchscoreIsIn = false
  countdownIsIn = false
})

app.get('/GFX_countdown', (req, res) => {
  res.send('game_id')
  playSingleGraphic(Commands.countdown())
  exitCommand = Commands.countdown_OUT()
})
app.get('/GFX_game_id', (req, res) => {
  res.send('game_id')
  playSingleGraphic(Commands.matchId())
  exitCommand = Commands.matchId_OUT()
})
app.get('/GFX_commentator', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(Commands.commentator())
  exitCommand = Commands.commentator_OUT()
})
app.get('/GFX_officials', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(Commands.officials())
  exitCommand = Commands.officials_OUT()
})
app.get('/GFX_timeout/:team', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(Commands.timeout(req.params.team == 0 ? gameData[0].logoA : gameData[0].logoB))
  exitCommand = Commands.timeout_OUT()
})
app.get('/GFX_lineupA/:variation', (req, res) => {
  res.send('GFX_lineup')
  let playersInGame = []
  tactical[0].forEach( player => {
    if (player.tactical > 0) playersInGame.push(player)
  })
  playSingleGraphic(Commands.lineup(playersInGame, "HOME", req.params.variation))
  exitCommand = Commands.lineup_OUT("HOME")
})
app.get('/GFX_lineupB/:variation', (req, res) => {
  res.send('GFX_lineup')
  let playersInGame = []
  tactical[1].forEach( player => {
    if (player.tactical > 0) playersInGame.push(player)
  })
  playSingleGraphic(Commands.lineup(playersInGame, "AWAY", req.params.variation))
  exitCommand = Commands.lineup_OUT("AWAY")
})
app.get('/GFX_clock_IN', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.clock())
  playSingleGraphic(Commands.redsIn(stats.reds))
  playSingleGraphic(Commands.setScore(score))
  playSingleGraphic(Commands.updateTime(clock))
  clockIsIn = true
})
app.get('/GFX_clock_OUT', (req, res) => {
  res.send('clock_OUT')
  playSingleGraphic(Commands.clock_OUT())
  playSingleGraphic(Commands.redsOut(stats.reds))
  clockIsIn = false
})
app.get('/GFX_coach/:team', (req, res) => {
  res.send('coach_IN')
  playSingleGraphic(Commands.coach(req.params.team))
  exitCommand = Commands.coach_OUT()
})
app.get('/foulsInHalf/:a/:b', (req, res) => {
  res.send('coach_IN')
  const foulsInHalf = [req.params.a, req.params.b]
  playSingleGraphic(Commands.foulsClock(foulsInHalf))
})


//PODPISI IZ URE
app.post('/podpis', (req, res) => {
  res.send('podpis')
  const name = req.body.name
  const number = req.body.number
})

app.post('/subClockInStart', (req, res) => {
  res.send('podpis')
  playSingleGraphic(Commands.SubClockInStart(req.body.player, req.body.country))
})
app.get('/subClockInStop', (req, res) => {
  res.send('podpis')
  playSingleGraphic(Commands.SubClockInStop())
})
app.post('/subClockOutStart', (req, res) => {
  res.send('podpis')
  playSingleGraphic(Commands.SubClockOutStart(req.body.player, req.body.country))
})
app.get('/subClockOutStop', (req, res) => {
  res.send('podpis')
  playSingleGraphic(Commands.SubClockOutStop())
})



app.get('/GFX_player', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.playerSig())
  exitCommand = Commands.playerSig_OUT()
})
app.get('/GFX_player_info/variation', (req, res) => {
  res.send('clock_IN')

  playSingleGraphic(Commands.playerInfo())
  exitCommand = Commands.playerInfo_OUT()
})
app.get('/GFX_ball_possesion/:a/:b', (req, res) => {
  res.send('ball possesion')
  playSingleGraphic(Commands.ballPossesion(req.params.a, req.params.b))
  exitCommand = Commands.ballPossesion_OUT()
})
app.get('/GFX_yellow', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.yellow(currentPlayer))
  exitCommand = Commands.yellow_OUT()
})
app.get('/GFX_double_yellow', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.doubleYellow(currentPlayer))
  exitCommand = Commands.doubleYellow_OUT()
})
app.get('/GFX_red', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.red(currentPlayer))
  exitCommand = Commands.red_OUT()
})
app.post('/statistics', (req, res) => {
  res.send('statistics')
  playSingleGraphic(Commands.statistics(stats, halftime < 2 ? "HALF-TIME" : "FUL TIME"))
  exitCommand = Commands.statistics_OUT()
})
app.post('/GFX_matchScore', (req, res) => {
  res.send('GFX_matchScore')
  const data = req.body
  playSingleGraphic(Commands.matchScore(data))
  exitCommand = Commands.matchScore_OUT(data)
})
app.post('/GFX_big_shootout', (req, res) => {
  res.send('shootout')
  const data = req.body
  console.log(data)
  playSingleGraphic(Commands.shootout(data))
  exitCommand = Commands.shootout_OUT()
})
app.post('/GFX_big_shootout_update', (req, res) => {
  res.send('shootout')
  const data = req.body
  console.log(data)
  playSingleGraphic(Commands.updateShootout(data))
  exitCommand = Commands.shootout_OUT()
})
app.post('/GFX_small_shootout', (req, res) => {
  res.send('shootout')
  const data = req.body
  console.log(data)
  playSingleGraphic(Commands.shootoutSmall(data))
  exitCommand = Commands.shootout_small_OUT()
})
app.post('/GFX_small_shootout_update', (req, res) => {
  res.send('shootout')
  const data = req.body
  console.log(data)
  playSingleGraphic(Commands.updateShootoutSmall(data))
  exitCommand = Commands.shootout_small_OUT()
})
app.post('/GFX_matchScore', (req, res) => {
  res.send('GFX_matchScore')
  const data = req.body
  playSingleGraphic(Commands.matchScore(data))
  exitCommand = Commands.matchScore_OUT(data)
})
app.get('/GFX_schedule', (req, res) => {
  res.send('schedule')
  playSingleGraphic(Commands.schedule())
  exitCommand = Commands.schedule_OUT()
})
app.get('/GFX_nextMatch', (req, res) => {
  res.send('next match')
  playSingleGraphic(Commands.nextMatch())
  exitCommand = Commands.nextMatch_OUT()
})
app.get('/GFX_multi_flash', (req, res) => {
  res.send('multi flash')
  playSingleGraphic(Commands.multiFlash())
  exitCommand = Commands.multiFlash_OUT()
})


app.post('/stats', (req, res) => {
  res.send('you sent stats')
  console.log(req.body)
  stats = req.body
})
app.post('/tacticalA', (req, res) => {
  res.send('got tactical A')
  tactical = [ req.body, tactical[1] ]
  console.log(tactical)
})
app.post('/tacticalB', (req, res) => {
  res.send('got tactical B')
  tactical = [ tactical[0], req.body ]
  console.log(tactical)
})
app.post('/currentPlayer', (req, res) => {
  res.send('current player')
  console.log(req.body)
  currentPlayer = req.body
})
app.get('/resetFouls', (req, res) => {
  res.send('multi flash')
  foulsIn=[0,0]
})
app.post('/lineupA', (req, res) => {
  res.send('lineup a')
   readCsv(req.body.path)
   .then(data => lineupA = data)
})
app.get('/lineupA', (req, res) => {
  res.json({team: lineupA})
})
app.post('/lineupB', (req, res) => {
  res.send('lineup b')
   readCsv(req.body.path)
   .then(data => lineupB = data)
})
app.get('/lineupB', (req, res) => {
  res.json({team: lineupB})
})
app.post('/gameData', (req, res) => {
  res.send('game data')
   readCsv(req.body.path)
   .then(data => gameData = data)
})
app.post('/clock', (req, res) => {
  res.send('lineup a')
  clockPath = req.body.path
})
app.get('/clock/:timestring', (req, res) => {
  res.send('got timestring')
  clock = req.params.timestring
  playSingleGraphic(Commands.updateTime(clock))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
