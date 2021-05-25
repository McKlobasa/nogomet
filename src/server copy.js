const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const csv = require('csv-parser')
const net = require('net')

const app = express()
const port = 4545
app.use(bodyParser.json())

const VIZ_port = 6100
const VIZ_ip = 'viz02'
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
let clockPath = 'C:\\Users\\marija.VPKLJ\\Desktop\\Clock.txt'
let clock = []
let clockIsIn = false
let exitCommand = ''
let score = [0,0]
let izkIn = [0,0]
let currentPlayer = {
  number: '10',
  surname: 'surko',
  isTeamA: 0,
  goalsBefore: 0,
  goals: 0,
  matches: 0
}
let matchscoreIsIn = false
let countdownIsIn = false
let foulsIn = [0,0]


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
}

class Viz {
  static project = 'CHL_FUTSAL'
  static setScene         = (project, scene)  => `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/${scene}\0`
  static setTextBasic     = (container, text) => `0 RENDERER*TREE*$${container}*GEOM*TEXT SET ${text}\0`
  static setTextPlugin    = (container, text) => `0 RENDERER*TREE*$${container}*FUNCTION*TFxWrite*Text SET ${text}\0`
  static animationStart   = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} START\0`
  static animationToStart = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} SHOW START\0`
  static animationToEnd   = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} SHOW END\0`
  static setActive        = (container)       => `0 RENDERER*TREE*$${container}*GEOM*ACTIVE SET 1\0`
  static setNonActive     = (container)       => `0 RENDERER*TREE*$${container}*GEOM*ACTIVE SET 0\0`
  static setLogo          = (container, path) => `0 RENDERER*TREE*$${container}*IMAGE SET IMAGE*${Viz.project}/LOGO/${path} 0\0`
}
class Commands {
  static countdown () {
    countdownIsIn = true
    return Viz.setScene(Viz.project, 'COUNTDOWN') +
      Viz.setLogo('LOGO_1', gameData[0].logoA) +
      Viz.setLogo('LOGO_2', gameData[0].logoB) +
      Viz.setTextBasic('TEAM_1', gameData[0].teamA) +
      Viz.setTextBasic('TEAM_2', gameData[0].teamB) +
      Viz.animationStart('COUNTDOWN_IN')
  }
  static countdown_OUT () {
    return Viz.setScene(Viz.project, 'COUNTDOWN') +
      Viz.animationStart('COUNTDOWN_OUT')
  }
  static updateCountdown () {
    return  Viz.setTextBasic('COUNT', clock[0])
  }
  static matchId () {
    return Viz.setScene(Viz.project, 'MATCH_ID') +
      Viz.animationStart('MATCH_ID_IN') +
      Viz.setLogo('LOGO_1', gameData[0].logoA) +
      Viz.setLogo('LOGO_2', gameData[0].logoB) +
      Viz.setTextBasic('TEAM_1', gameData[0].teamA) +
      Viz.setTextBasic('TEAM_2', gameData[0].teamB) +
      Viz.setTextBasic('DATE', gameData[0].datum) +
      Viz.setTextBasic('TIME', gameData[0].kraj)
  }
  static matchId_OUT () {
    return Viz.setScene(Viz.project, 'MATCH_ID') +
      Viz.animationStart('MATCH_ID_OUT')
  }
  static lineupA () {
    console.log(gameData)
    return Viz.setScene(Viz.project, 'LINEUP') +
      Viz.animationStart('LINEUP_IN') +
      Viz.setLogo('LOGO', gameData[0].logoA) +
      Viz.setTextBasic('CLUB_NAME', gameData[0].teamA) +
      Viz.setTextBasic('NAME', gameData[0].trenerImeA) +
      Viz.setTextBasic('SURNAME', gameData[0].trenerPriimekA) +
      Viz.setTextBasic('NUMBER_1' , lineupA[0].st) +
      Viz.setTextBasic('PLAYER_1' , lineupA[0].priimek) +
      Viz.setTextBasic('NUMBER_2' , lineupA[1].st) +
      Viz.setTextBasic('PLAYER_2' , lineupA[1].priimek) +
      Viz.setTextBasic('NUMBER_3' , lineupA[2].st) +
      Viz.setTextBasic('PLAYER_3' , lineupA[2].priimek) +
      Viz.setTextBasic('NUMBER_4' , lineupA[3].st) +
      Viz.setTextBasic('PLAYER_4' , lineupA[3].priimek) +
      Viz.setTextBasic('NUMBER_5' , lineupA[4].st) +
      Viz.setTextBasic('PLAYER_5' , lineupA[4].priimek) +
      Viz.setTextBasic('NUMBER_6' , lineupA[5].st) +
      Viz.setTextBasic('PLAYER_6' , lineupA[5].priimek) +
      Viz.setTextBasic('NUMBER_7' , lineupA[6].st) +
      Viz.setTextBasic('PLAYER_7' , lineupA[6].priimek) +
      Viz.setTextBasic('NUMBER_8' , lineupA[7].st) +
      Viz.setTextBasic('PLAYER_8' , lineupA[7].priimek) +
      Viz.setTextBasic('NUMBER_9' , lineupA[8].st) +
      Viz.setTextBasic('PLAYER_9' , lineupA[8].priimek) +
      Viz.setTextBasic('NUMBER_10', lineupA[9].st) +
      Viz.setTextBasic('PLAYER_10', lineupA[9].priimek) +
      Viz.setTextBasic('NUMBER_11', lineupA[10].st) +
      Viz.setTextBasic('PLAYER_11', lineupA[10].priimek) +
      Viz.setTextBasic('NUMBER_12', lineupA[11].st) +
      Viz.setTextBasic('PLAYER_12', lineupA[11].priimek) +
      Viz.setTextBasic('NUMBER_13', lineupA[12].st) +
      Viz.setTextBasic('PLAYER_13', lineupA[12].priimek) +
      Viz.setTextBasic('NUMBER_14', lineupA[13].st) +
      Viz.setTextBasic('PLAYER_14', lineupA[13].priimek)
  }
  static lineup_OUT () {
    return Viz.animationStart('LINEUP_OUT')
  }
  static lineupB () {
    console.log(gameData)
    return Viz.setScene(Viz.project, 'LINEUP') +
      Viz.animationStart('LINEUP_IN') +
      Viz.setLogo('LOGO', gameData[0].logoB) +
      Viz.setTextBasic('CLUB_NAME', gameData[0].teamB) +
      Viz.setTextBasic('NAME', gameData[0].trenerImeB) +
      Viz.setTextBasic('SURNAME', gameData[0].trenerPriimekB) +
      Viz.setTextBasic('NUMBER_1' , lineupB[0].st) +
      Viz.setTextBasic('PLAYER_1' , lineupB[0].priimek) +
      Viz.setTextBasic('NUMBER_2' , lineupB[1].st) +
      Viz.setTextBasic('PLAYER_2' , lineupB[1].priimek) +
      Viz.setTextBasic('NUMBER_3' , lineupB[2].st) +
      Viz.setTextBasic('PLAYER_3' , lineupB[2].priimek) +
      Viz.setTextBasic('NUMBER_4' , lineupB[3].st) +
      Viz.setTextBasic('PLAYER_4' , lineupB[3].priimek) +
      Viz.setTextBasic('NUMBER_5' , lineupB[4].st) +
      Viz.setTextBasic('PLAYER_5' , lineupB[4].priimek) +
      Viz.setTextBasic('NUMBER_6' , lineupB[5].st) +
      Viz.setTextBasic('PLAYER_6' , lineupB[5].priimek) +
      Viz.setTextBasic('NUMBER_7' , lineupB[6].st) +
      Viz.setTextBasic('PLAYER_7' , lineupB[6].priimek) +
      Viz.setTextBasic('NUMBER_8' , lineupB[7].st) +
      Viz.setTextBasic('PLAYER_8' , lineupB[7].priimek) +
      Viz.setTextBasic('NUMBER_9' , lineupB[8].st) +
      Viz.setTextBasic('PLAYER_9' , lineupB[8].priimek) +
      Viz.setTextBasic('NUMBER_10', lineupB[9].st) +
      Viz.setTextBasic('PLAYER_10', lineupB[9].priimek) +
      Viz.setTextBasic('NUMBER_11', lineupB[10].st) +
      Viz.setTextBasic('PLAYER_11', lineupB[10].priimek) +
      Viz.setTextBasic('NUMBER_12', lineupB[11].st) +
      Viz.setTextBasic('PLAYER_12', lineupB[11].priimek) +
      Viz.setTextBasic('NUMBER_13', lineupB[12].st) +
      Viz.setTextBasic('PLAYER_13', lineupB[12].priimek) +
      Viz.setTextBasic('NUMBER_14', lineupB[13].st) +
      Viz.setTextBasic('PLAYER_14', lineupB[13].priimek)
  }
  static updateScoreClock () {
    return Viz.setScene(Viz.project, 'CLOCK') +
      Viz.setTextBasic('SCORE', `${score[0]}-${score[1]}`)
  }
  static coach (team) {
    const name = team == 0 ? gameData[0].trenerImeA : gameData[0].trenerImeB
    const surname = team == 0 ? gameData[0].trenerPriimekA : gameData[0].trenerPriimekB
    const logo = team == 0 ? gameData[0].logoA : gameData[0].logoB
    return Viz.setScene(Viz.project, 'CLOCK') +
      Viz.setTextBasic('NAME_COACH', name) +
      Viz.setTextBasic('SURNAME_COACH', surname) +
      Viz.animationStart(`HOME_FOUL_${foulsIn[0]}_OUT`) +
      Viz.animationStart(`AWAY_FOUL_${Number(foulsIn[1]) + 5}_OUT`) +
      Viz.setLogo('LOGO_1_COACH', logo) +
      Viz.animationStart('COACH_ID_IN')
  }
  static coach_OUT (name, surname) {
    let homeFouls = ''
    let awayFouls = ''
    let homeBonus = ''
    let awayBonus = ''
    for (let i = 1; i <= 5; i++) {
      if (i <= foulsIn[0]) homeFouls += Viz.animationStart(`HOME_FOUL_${i}_IN`)
      if (i <= foulsIn[1]) awayFouls += Viz.animationStart(`AWAY_FOUL_${i + 5}_IN`)
    }

    if (foulsIn[0] > 4) homeBonus = Viz.animationStart('HOME_BONUS_IN')
    if (foulsIn[1] > 4) awayBonus = Viz.animationStart('AWAY_BONUS_IN')
    return Viz.setScene(Viz.project, 'CLOCK') +
      Viz.animationStart('COACH_ID_OUT')
  }

  static clock () {
    let homeFouls = ''
    let awayFouls = ''
    let homeBonus = ''
    let awayBonus = ''
    for (let i = 1; i <= 5; i++) {
      if (i <= foulsIn[0]) homeFouls += Viz.animationStart(`HOME_FOUL_${i}_IN`)
      if (i <= foulsIn[1]) awayFouls += Viz.animationStart(`AWAY_FOUL_${i + 5}_IN`)
    }

    if (foulsIn[0] > 4) homeBonus = Viz.animationStart('HOME_BONUS_IN')
    if (foulsIn[1] > 4) awayBonus = Viz.animationStart('AWAY_BONUS_IN')
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('CLOCK_IN') +
      Viz.setTextBasic('TEAM_1', gameData[0].logoA) + Viz.setTextBasic('TEAM_2', gameData[0].logoB) +
      Viz.setTextBasic('SCORE', `${score[0]}-${score[1]}`) + homeFouls + awayFouls + homeBonus + awayBonus
  }
  static clock_OUT () {
    return [
      Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('CLOCK_OUT') +
      Viz.animationStart(`HOME_FOUL_${foulsIn[0]}_OUT`) +
      Viz.animationStart(`AWAY_FOUL_${Number(foulsIn[1]) + 5}_OUT`),
      Viz.setScene(Viz.project, 'PRAZNA_SCENA')
    ]
  }
  static updateTime () {
    return Viz.setScene(Viz.project, 'CLOCK') +
      Viz.setTextBasic('URA', clock[0]) +
      Viz.setTextBasic('CLOCK_1_1', clock[1]) +
      Viz.setTextBasic('CLOCK_1_2', clock[2]) +
      Viz.setTextBasic('CLOCK_2_1', clock[4]) +
      Viz.setTextBasic('CLOCK_2_2', clock[5])
  }
  static foulsClock (fouls) {
    let homeFouls = ''
    let awayFouls = ''
    let homeBonus = ''
    let awayBonus = ''
    for (let i = 1; i <= 5; i++) {
      if (i == fouls[0] && fouls[0] != foulsIn[0]) homeFouls += Viz.animationStart(`HOME_FOUL_${i}_IN`)
      if (i == fouls[1] && fouls[1] != foulsIn[1]) awayFouls += Viz.animationStart(`AWAY_FOUL_${i + 5}_IN`)
    }

    foulsIn = fouls


    if (fouls[0] > 4) homeBonus = Viz.animationStart('HOME_BONUS_IN')
    if (fouls[1] > 4) awayBonus = Viz.animationStart('AWAY_BONUS_IN')
    return Viz.setScene(Viz.project, 'CLOCK') +
      Viz.setTextBasic('SCORE', `${score[0]}-${score[1]}`) + homeFouls + awayFouls + homeBonus + awayBonus
  }
  static izk1 () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('IZKLJUCITEV_1_L_IN')
  }
  static izk1_OUT () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('IZKLJUCITEV_1_L_OUT')
  }
  static izk2 () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('IZKLJUCITEV_2_L_IN')
  }
  static izk2_OUT () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('IZKLJUCITEV_2_L_OUT')
  }
  static izk3 () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('IZKLJUCITEV_1_R_IN')
  }
  static izk3_OUT () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('IZKLJUCITEV_1_R_OUT')
  }
  static izk4 () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('IZKLJUCITEV_2_R_IN')
  }
  static izk4_OUT () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('IZKLJUCITEV_2_R_OUT')
  }

  static playerSig () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('PLAYER_ID_IN') +
      Viz.setTextBasic('PLAYER', `${currentPlayer.number} ${currentPlayer.surname}`) +
      Viz.animationStart(`HOME_FOUL_${foulsIn[0]}_OUT`) +
      Viz.animationStart(`AWAY_FOUL_${Number(foulsIn[1]) + 5}_OUT`) +
      Viz.setLogo('LOGO_1_PLAYER', currentPlayer.isTeamA  == 0? gameData[0].logoA : gameData[0].logoB)

  }
  static playerSig_OUT () {
    let homeFouls = ''
    let awayFouls = ''
    let homeBonus = ''
    let awayBonus = ''
    for (let i = 1; i <= 5; i++) {
      if (i <= foulsIn[0]) homeFouls += Viz.animationStart(`HOME_FOUL_${i}_IN`)
      if (i <= foulsIn[1]) awayFouls += Viz.animationStart(`AWAY_FOUL_${i + 5}_IN`)
    }


    if (foulsIn[0] > 4) homeBonus = Viz.animationStart('HOME_BONUS_IN')
    if (foulsIn[1] > 4) awayBonus = Viz.animationStart('AWAY_BONUS_IN')
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('PLAYER_ID_OUT') + homeFouls + awayFouls + homeBonus + awayBonus
  }
  static playerInfo () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('PLAYER_ID_INFO_IN') +
      Viz.setTextBasic('PLAYER_INFO', `${currentPlayer.number} ${currentPlayer.surname}`) +
      Viz.animationStart(`HOME_FOUL_${foulsIn[0]}_OUT`) +
      Viz.animationStart(`AWAY_FOUL_${Number(foulsIn[1]) + 5}_OUT`) +
      Viz.setTextBasic('STAT_1', `${Number(currentPlayer.goals) + Number(currentPlayer.goalsBefore)} IN ${currentPlayer.matches} MATCHES`) +
      Viz.setLogo('LOGO_1_PLAYER', currentPlayer.isTeamA  == 0? gameData[0].logoA : gameData[0].logoB)

  }
  static playerInfo_OUT () {
    let homeFouls = ''
    let awayFouls = ''
    let homeBonus = ''
    let awayBonus = ''
    for (let i = 1; i <= 5; i++) {
      if (i <= foulsIn[0]) homeFouls += Viz.animationStart(`HOME_FOUL_${i}_IN`)
      if (i <= foulsIn[1]) awayFouls += Viz.animationStart(`AWAY_FOUL_${i + 5}_IN`)
    }

    if (foulsIn[0] > 4) homeBonus = Viz.animationStart('HOME_BONUS_IN')
    if (foulsIn[1] > 4) awayBonus = Viz.animationStart('AWAY_BONUS_IN')
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('PLAYER_ID_INFO_OUT') + homeFouls + awayFouls + homeBonus + awayBonus
  }
  static yellow () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('YELLOW_CARD_IN') +
      Viz.setTextBasic('PLAYER_YELLOW', `${currentPlayer.number} ${currentPlayer.surname}`) +
      Viz.animationStart(`HOME_FOUL_${foulsIn[0]}_OUT`) +
      Viz.animationStart(`AWAY_FOUL_${Number(foulsIn[1]) + 5}_OUT`) +
      Viz.setLogo('LOGO_1_YELLOW', currentPlayer.isTeamA  == 0? gameData[0].logoA : gameData[0].logoB)
  }
  static yellow_OUT () {
    let homeFouls = ''
    let awayFouls = ''
    let homeBonus = ''
    let awayBonus = ''
    for (let i = 1; i <= 5; i++) {
      if (i <= foulsIn[0]) homeFouls += Viz.animationStart(`HOME_FOUL_${i}_IN`)
      if (i <= foulsIn[1]) awayFouls += Viz.animationStart(`AWAY_FOUL_${i + 5}_IN`)
    }


    if (foulsIn[0] > 4) homeBonus = Viz.animationStart('HOME_BONUS_IN')
    if (foulsIn[1] > 4) awayBonus = Viz.animationStart('AWAY_BONUS_IN')
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('YELLOW_CARD_OUT') + homeFouls + awayFouls + homeBonus + awayBonus
  }
  static ballPossesion (possesion1, possesion2) {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('BALL_POSSESION_IN') +
      Viz.setTextBasic('STAT_POSSESION_1', possesion1) +
      Viz.setTextBasic('STAT_POSSESION_2', possesion2) +
      Viz.animationStart(`HOME_FOUL_${foulsIn[0]}_OUT`) +
      Viz.animationStart(`AWAY_FOUL_${Number(foulsIn[1]) + 5}_OUT`) +
      Viz.setLogo('LOGO_1', gameData[0].logoA) +
      Viz.setLogo('LOGO_2', gameData[0].logoB)
  }
  static ballPossesion_OUT () {
    let homeFouls = ''
    let awayFouls = ''
    let homeBonus = ''
    let awayBonus = ''
    for (let i = 1; i <= 5; i++) {
      if (i <= foulsIn[0]) homeFouls += Viz.animationStart(`HOME_FOUL_${i}_IN`)
      if (i <= foulsIn[1]) awayFouls += Viz.animationStart(`AWAY_FOUL_${i + 5}_IN`)
    }


    if (foulsIn[0] > 4) homeBonus = Viz.animationStart('HOME_BONUS_IN')
    if (foulsIn[1] > 4) awayBonus = Viz.animationStart('AWAY_BONUS_IN')
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('BALL_POSSESION_OUT') + homeFouls + awayFouls + homeBonus + awayBonus
  }
  static doubleYellow () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('DOUBLE_YELLOW_IN') +
      Viz.setTextBasic('PLAYER_DOUBLE_YELLOW', `${currentPlayer.number} ${currentPlayer.surname}`) +
      Viz.animationStart(`HOME_FOUL_${foulsIn[0]}_OUT`) +
      Viz.animationStart(`AWAY_FOUL_${Number(foulsIn[1]) + 5}_OUT`) +
      Viz.setLogo('LOGO_1_DOUBLE_YELLOW', currentPlayer.isTeamA == 0 ? gameData[0].logoA : gameData[0].logoB)
  }
  static doubleYellow_OUT () {
    let homeFouls = ''
    let awayFouls = ''
    let homeBonus = ''
    let awayBonus = ''
    for (let i = 1; i <= 5; i++) {
      if (i <= foulsIn[0]) homeFouls += Viz.animationStart(`HOME_FOUL_${i}_IN`)
      if (i <= foulsIn[1]) awayFouls += Viz.animationStart(`AWAY_FOUL_${i + 5}_IN`)
    }


    if (foulsIn[0] > 4) homeBonus = Viz.animationStart('HOME_BONUS_IN')
    if (foulsIn[1] > 4) awayBonus = Viz.animationStart('AWAY_BONUS_IN')
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('DOUBLE_YELLOW_OUT') + homeFouls + awayFouls + homeBonus + awayBonus
  }
  static red () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('RED_CARD_IN') +
      Viz.setTextBasic('PLAYER_RED', `${currentPlayer.number} ${currentPlayer.surname}`) +
      Viz.animationStart(`HOME_FOUL_${foulsIn[0]}_OUT`) +
      Viz.animationStart(`AWAY_FOUL_${Number(foulsIn[1]) + 5}_OUT`) +
      Viz.setLogo('LOGO_1_RED', currentPlayer.isTeamA == 0 ? gameData[0].logoA : gameData[0].logoB)
  }
  static red_OUT () {
    let homeFouls = ''
    let awayFouls = ''
    let homeBonus = ''
    let awayBonus = ''
    for (let i = 1; i <= 5; i++) {
      if (i <= foulsIn[0]) homeFouls += Viz.animationStart(`HOME_FOUL_${i}_IN`)
      if (i <= foulsIn[1]) awayFouls += Viz.animationStart(`AWAY_FOUL_${i + 5}_IN`)
    }

    if (foulsIn[0] > 4) homeBonus = Viz.animationStart('HOME_BONUS_IN')
    if (foulsIn[1] > 4) awayBonus = Viz.animationStart('AWAY_BONUS_IN')
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('RED_CARD_OUT') + homeFouls + awayFouls + homeBonus + awayBonus
  }
  static statistics (data) {
    return Viz.setScene(Viz.project, 'STATISTIC') +

      Viz.setTextBasic('TEAM_1', gameData[0].teamA) +
      Viz.setTextBasic('TEAM_2', gameData[0].teamB) +

      Viz.setLogo('LOGO_1', gameData[0].logoA) +
      Viz.setLogo('LOGO_1', gameData[0].logoB) +

      Viz.setTextBasic('TIME', data.time) +

      Viz.setTextBasic('SCORE', `${data.goals[0]} - ${data.goals[1]}`) +

      Viz.setTextBasic('S_1_1', data.shots[0]) +
      Viz.setTextBasic('S_1_4', data.shots[1]) +

      Viz.setTextBasic('S_1_2', data.attempts[0]) +
      Viz.setTextBasic('S_1_5', data.attempts[1]) +

      Viz.setTextBasic('S_1_3', data.corners[0]) +
      Viz.setTextBasic('S_1_6', data.corners[1]) +

      Viz.setTextBasic('H_1_1', data.fouls[0][0]) +
      Viz.setTextBasic('H_2_1', data.fouls[0][1]) +
      Viz.setTextBasic('H_1_4', data.fouls[1][0]) +
      Viz.setTextBasic('H_2_4', data.fouls[1][1]) +

      Viz.setTextBasic('H_1_2', data.yellows[0][0]) +
      Viz.setTextBasic('H_2_2', data.yellows[0][1]) +
      Viz.setTextBasic('H_1_5', data.yellows[1][0]) +
      Viz.setTextBasic('H_2_5', data.yellows[1][1]) +

      Viz.setTextBasic('H_1_3', data.reds[0][0]) +
      Viz.setTextBasic('H_2_3', data.reds[0][1]) +
      Viz.setTextBasic('H_1_6', data.reds[1][0]) +
      Viz.setTextBasic('H_2_6', data.reds[1][1]) +

      Viz.animationStart('STATISTIC_IN')
  }
  static statistics_OUT (data) {
    return Viz.setScene(Viz.project, 'STATISTIC') +
      Viz.animationStart('STATISTIC_OUT')
  }
  static commentator () {
    return Viz.setScene(Viz.project, 'COMMENTATOR') + Viz.animationStart('COMMENTATOR_IN') +
      Viz.setTextBasic('COMMENTATOR_', gameData[0].komentator)
  }
  static commentator_OUT () {
    return Viz.setScene(Viz.project, 'COMMENTATOR') + Viz.animationStart('COMMENTATOR_IN')
  }
  static officials () {
    return Viz.setScene(Viz.project, 'MATCH_OFFICIALS') + Viz.animationStart('MATCH_OFFICIALS_IN') +
      Viz.setTextBasic('REFEREE', gameData[0].sodnik1)        + Viz.setTextBasic('COUNTRY_1', '(' + gameData[0].country1 + ')') +
      Viz.setTextBasic('SECOND_REFEREE', gameData[0].sodnik2) + Viz.setTextBasic('COUNTRY_2', '(' + gameData[0].country2 + ')') +
      Viz.setTextBasic('THIRD_OFFICIAL', gameData[0].sodnik3) + Viz.setTextBasic('COUNTRY_3', '(' + gameData[0].country3 + ')') +
      Viz.setTextBasic('TIMEKEEPER', gameData[0].sodnik4)     + Viz.setTextBasic('COUNTRY_4', '(' + gameData[0].country4 + ')')
  }
  static officials_OUT () {
    return Viz.setScene(Viz.project, 'MATCH_OFFICIALS') + Viz.animationStart('MATCH_OFFICIALS_OUT')
  }
  static timeout (logo) {
    return Viz.setScene(Viz.project, 'TIMEOUT') + Viz.animationStart('TIMEOUT_IN') +
      Viz.setLogo('LOGO', logo)
  }
  static timeout_OUT (logo) {
    return Viz.setScene(Viz.project, 'TIMEOUT') + Viz.animationStart('TIMEOUT_OUT')
  }
  static matchScore (data) {
    console.log(data)
    matchscoreIsIn = true
    let dataString = ''
    for (let i = 0; i < (data.size * 2); i++) {
      const side = (i % 2) + 1
      const order = Math.floor(i / 2) + 1
      dataString += Viz.setTextBasic(`STRELEC_${side}_${order}`, data.shooters[i]) +
      Viz.setTextBasic(`TIME_${side}_${order}`, data.times[i])
    }
    return Viz.setScene(Viz.project, data.scene) +
      Viz.setLogo('LOGO_1', gameData[0].logoA) +
      Viz.setLogo('LOGO_2', gameData[0].logoB) +
      Viz.setTextBasic('TEAM_1', gameData[0].teamA) +
      Viz.setTextBasic('TEAM_2', gameData[0].teamB) +
      Viz.setTextBasic('SCORE', data.score) +
      Viz.setTextBasic('PERIOD', data.period) +
      dataString +
      Viz.animationStart(data.scene + '_IN')
  }
  static matchScore_OUT (data) {
    return Viz.animationStart(data.scene + '_OUT')
  }
  static updateTimeMatchScore () {
    return Viz.setTextBasic('CLOCK', clock[0])
  }
}



fs.watch(clockPath, (event, filename) => {
  if (filename) {
    fs.readFile(clockPath, 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      clock = data.split('\r\n')
      if (clockIsIn) playSingleGraphic(Commands.updateTime())
      if (matchscoreIsIn) playSingleGraphic(Commands.updateTimeMatchScore())
      if (countdownIsIn)  playSingleGraphic(Commands.updateCountdown())
    })
  }
});

const readCsv = async (path) => {
  let arr = []
  try {
  await fs.createReadStream(path)
    .pipe(csv())
    .on('data', (data) => arr.push(data))
    .on('end', () => {
      console.log(arr);
    });
  } catch (err) {
    console.log(err)
  }
  return arr
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/score/:a/:b', (req, res) => {
  res.send('score')
  score = [req.params.a, req.params.b]
  playSingleGraphic(Commands.updateScoreClock())
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
app.get('/GFX_lineupA', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(Commands.lineupA())
  exitCommand = Commands.lineup_OUT()
})
app.get('/GFX_lineupB', (req, res) => {
  res.send('GFX_lineup')
  playSingleGraphic(Commands.lineupB())
  exitCommand = Commands.lineup_OUT()
})
app.get('/GFX_clock_IN', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.clock())
  clockIsIn = true
})
app.get('/GFX_clock_OUT', (req, res) => {
  res.send('clock_OUT')
  playGraphics(Commands.clock_OUT(), [10, 500])
  clockIsIn = false
})
app.get('/GFX_izk1_IN', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk1())
})
app.get('/GFX_izk1_OUT', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk1_OUT())
})
app.get('/GFX_izk2_IN', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk2())
})
app.get('/GFX_izk2_OUT', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk2_OUT())
})
app.get('/GFX_izk3_IN', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk3())
})
app.get('/GFX_izk3_OUT', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk3_OUT())
})
app.get('/GFX_izk4_IN', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk4())
})
app.get('/GFX_izk4_OUT', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk4_OUT())
})
app.get('/GFX_izk4_OUT', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.izk4_OUT())
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

app.get('/GFX_player', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.playerSig())
  exitCommand = Commands.playerSig_OUT()
})
app.get('/GFX_player_info', (req, res) => {
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
  playSingleGraphic(Commands.yellow())
  exitCommand = Commands.yellow_OUT()
})
app.get('/GFX_double_yellow', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.doubleYellow())
  exitCommand = Commands.doubleYellow_OUT()
})
app.get('/GFX_red', (req, res) => {
  res.send('clock_IN')
  playSingleGraphic(Commands.red())
  exitCommand = Commands.red_OUT()
})
app.post('/statistics', (req, res) => {
  res.send('statistics')
  const data = req.body
  playSingleGraphic(Commands.statistics(data))
  exitCommand = Commands.statistics_OUT()
})
app.post('/GFX_matchScore', (req, res) => {
  res.send('GFX_matchScore')
  const data = req.body
  playSingleGraphic(Commands.matchScore(data))
  exitCommand = Commands.matchScore_OUT(data)
})


app.post('/currentPlayer', (req, res) => {
  res.send('current player')
  console.log(req.body)
  currentPlayer = req.body
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
app.get('/clock', (req, res) => {
  res.json({clock})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
