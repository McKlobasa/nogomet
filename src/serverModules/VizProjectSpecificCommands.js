const Viz = require('./VizCoreCommands')


class VizCommands {

  static SubClockOutStart (playerString, country) {
    return Viz.setScene(Viz.project, 'CLOCK') +
      Viz.setTextBasic('COUNTRY_OFF', country) +
      Viz.setTextBasic('PLAYER_OFF', playerString) +
      Viz.animationStart('SUB_OFF_IN')
  }
  static SubClockOutStop () {
    return Viz.setScene(Viz.project, 'CLOCK') +
      Viz.animationStart('SUB_OFF_OUT')
  }
  static SubClockInStart (playerString, country) {
    return Viz.setScene(Viz.project, 'CLOCK') +
      Viz.setTextBasic('COUNTRY_ON', country) +
      Viz.setTextBasic('PLAYER_ON', playerString) +
      Viz.animationStart('SUB_ON_IN')
  }
  static SubClockInStop () {
    return Viz.setScene(Viz.project, 'CLOCK') +
      Viz.animationStart('SUB_ON_OUT')
  }
  static matchscore00 (goals, halftimeString) {
    return Viz.setScene(Viz.project, 'MATCH_SCORE_00') +
      Viz.animationStart('MATCH_SCORE_IN') +
      Viz.setTextBasic('TXT', halftimeString) +
      Viz.setTextBasic('SCORE_1', goals[0]) +
      Viz.setTextBasic('SCORE_2', goals[1])
  }
  static matchscore00Out () {
    return Viz.setScene(Viz.project, 'MATCH_SCORE_00') +
      Viz.animationStart('MATCH_SCORE_OUT')
  }
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
  static lineup (players, team, variation) {   // team: "HOME" || "AWAY"    variation: eg. "451"
    const ensureLeadingZero = number => `${Math.floor(number / 10)}${number % 10}`

    const getPlayersSetString = (player, iter) =>
      Viz.setTextBasic(`NUMBER_${ensureLeadingZero(iter+1)}`, player.st) +
      Viz.setTextBasic(`SURNAME_${ensureLeadingZero(iter+1)}`, player.priimek) +
      Viz.setTextBasic(`NAME_${ensureLeadingZero(iter+1)}`, player.name) +
      Viz.setTextBasic(`NUMBER_${ensureLeadingZero(player.tactical)}_T`, player.st) +
      Viz.setTextBasic(`SURNAME_${ensureLeadingZero(player.tactical)}_T`, player.priimek)

    let outputString = Viz.setScene(Viz.project, `${team}_LINEUP_${variation}`) + Viz.animationStart(`${team}_LINEUP_IN`)

    players.forEach((player, iter) => outputString += getPlayersSetString(player, iter))

    console.log(outputString)
    return outputString
  }
  static lineup_OUT (team) {
    return Viz.animationStart(`${team}_LINEUP_OUT`)
  }
  static substitutes (players) {
    const ensureLeadingZero = number => `${Math.floor(number / 10)}${number % 10}`

    const getPlayersSetStringA = (player, iter) =>
      Viz.setTextBasic(`HN_${ensureLeadingZero(iter+1)}`, `${player.st}`) +
      Viz.setTextBasic(`HS_${ensureLeadingZero(iter+1)}`, `${player.priimek}`)
    const getPlayersSetStringB = (player, iter) =>
      Viz.setTextBasic(`AN_${ensureLeadingZero(iter+1)}`, `${player.st}`) +
      Viz.setTextBasic(`AS_${ensureLeadingZero(iter+1)}`, `${player.priimek}`)

    let outputString = Viz.setScene(Viz.project, `DOUBLE_SUBSTITUTES`) + Viz.animationStart(`DOUBLE_SUBSTITUTES_IN`)

    players[0].forEach((player, iter) => outputString += getPlayersSetStringA(player, iter))
    players[1].forEach((player, iter) => outputString += getPlayersSetStringB(player, iter))


    return outputString
  }
  static substitutes_OUT (team) {
    return Viz.animationStart(`DOUBLE_SUBSTITUTES_OUT`)
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
      foulStackA_OUT[Number(foulsIn[0]) < 6 ?  Number(foulsIn[0]) : 5] +
      foulStackB_OUT[Number(foulsIn[1]) < 6 ?  Number(foulsIn[1]) : 5] +
      Viz.setLogo('LOGO_1_COACH', logo) +
      Viz.animationStart('COACH_ID_IN')
  }
  static coach_OUT (name, surname) {
    const correction = [foulsIn[0] > 0 ? 1 : 0, foulsIn[1] > 0 ? 1 : 0]
    let homeFouls = foulStackA_IN.slice(0, Number(foulsIn[0]) > 6 ? 6 : Number(foulsIn[0]) + correction[0]).reduce((a, b) => a + b, 0)
    let awayFouls = foulStackB_IN.slice(0, Number(foulsIn[1]) > 6 ? 6 : Number(foulsIn[1]) + correction[1]).reduce((a, b) => a + b, 0)

    return Viz.setScene(Viz.project, 'CLOCK') +
      Viz.animationStart('COACH_ID_OUT') + homeFouls + awayFouls
  }

  static clock (time) {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('CLOCK_IN')
  }
  static clock_OUT () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('CLOCK_OUT')
  }
  static updateTime (timestring) {
    return Viz.setTextBasic('CLOCK_TXT', timestring)
  }
  static setScore (score) {
    return Viz.setTextBasic('SCORE_1', `${score[0]}`) +
      Viz.setTextBasic('SCORE_2', `${score[1]}`)
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
      foulStackA_OUT[Number(foulsIn[0]) < 6 ?  Number(foulsIn[0]) : 5] +
      foulStackB_OUT[Number(foulsIn[1]) < 6 ?  Number(foulsIn[1]) : 5] +
      Viz.setLogo('LOGO_1_PLAYER', currentPlayer.isTeamA  == 0? gameData[0].logoA : gameData[0].logoB)
  }
  static playerSig_OUT () {
    const correction = [foulsIn[0] > 0 ? 1 : 0, foulsIn[1] > 0 ? 1 : 0]
    let homeFouls = foulStackA_IN.slice(0, Number(foulsIn[0]) > 6 ? 6 : Number(foulsIn[0]) + correction[0]).reduce((a, b) => a + b, 0)
    let awayFouls = foulStackB_IN.slice(0, Number(foulsIn[1]) > 6 ? 6 : Number(foulsIn[1]) + correction[1]).reduce((a, b) => a + b, 0)
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('PLAYER_ID_OUT') + homeFouls + awayFouls
  }
  static playerInfo () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('PLAYER_ID_INFO_IN') +
      Viz.setTextBasic('PLAYER_INFO', `${currentPlayer.number} ${currentPlayer.surname}`) +
      foulStackA_OUT[Number(foulsIn[0]) < 6 ?  Number(foulsIn[0]) : 5] +
      foulStackB_OUT[Number(foulsIn[1]) < 6 ?  Number(foulsIn[1]) : 5] +
      Viz.setTextBasic('STAT_1', `${Number(currentPlayer.goals) + Number(currentPlayer.goalsBefore)} IN ${currentPlayer.matches} MATCHES`) +
      Viz.setLogo('LOGO_1_PLAYER', currentPlayer.isTeamA  == 0? gameData[0].logoA : gameData[0].logoB)

  }
  static playerInfo_OUT () {
    const correction = [foulsIn[0] > 0 ? 1 : 0, foulsIn[1] > 0 ? 1 : 0]
    let homeFouls = foulStackA_IN.slice(0, Number(foulsIn[0]) > 6 ? 6 : Number(foulsIn[0]) + correction[0]).reduce((a, b) => a + b, 0)
    let awayFouls = foulStackB_IN.slice(0, Number(foulsIn[1]) > 6 ? 6 : Number(foulsIn[1]) + correction[1]).reduce((a, b) => a + b, 0)
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('PLAYER_ID_INFO_OUT') + homeFouls + awayFouls
  }
  static yellow (player) {
    console.log(player)
    return Viz.animationStart('YELLOW_CARD_IN') +
      Viz.setTextBasic('PLAYER_YELLOW', `${player.number} ${player.surname} (${player.isTeamA == 0 ? 'MLT' : 'NIR'})`)
  }
  static yellow_OUT () {
    return Viz.animationStart('YELLOW_CARD_OUT')
  }
  static doubleYellow (player) {
    console.log(player)
    return Viz.animationStart('DOUBLE_YELLOW_IN') +
      Viz.setTextBasic('PLAYER_DOUBLE_YELLOW', `${player.number} ${player.surname} (${player.isTeamA == 0 ? 'MLT' : 'NIR'})`)
  }
  static doubleYellow_OUT () {
    return Viz.animationStart('DOUBLE_YELLOW_OUT')
  }
  static red (player) {
    console.log(player)
    return Viz.animationStart('RED_CARD_IN') +
      Viz.setTextBasic('PLAYER_RED', `${player.number} ${player.surname} (${player.isTeamA == 0 ? 'MLT' : 'NIR'})`)
  }
  static red_OUT () {
    return Viz.animationStart('RED_CARD_OUT')
  }
  static ballPossesion (possesion1, possesion2) {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('BALL_POSSESION_IN') +
      Viz.setTextBasic('STAT_POSSESION_1', possesion1) +
      Viz.setTextBasic('STAT_POSSESION_2', possesion2) +
      foulStackA_OUT[Number(foulsIn[0]) < 6 ?  Number(foulsIn[0]) : 5] +
      foulStackB_OUT[Number(foulsIn[1]) < 6 ?  Number(foulsIn[1]) : 5] +
      Viz.setLogo('LOGO_1', gameData[0].logoA) +
      Viz.setLogo('LOGO_2', gameData[0].logoB)
  }
  static ballPossesion_OUT () {

    const correction = [foulsIn[0] > 0 ? 1 : 0, foulsIn[1] > 0 ? 1 : 0]
    let homeFouls = foulStackA_IN.slice(0, Number(foulsIn[0]) > 6 ? 6 : Number(foulsIn[0]) + correction[0]).reduce((a, b) => a + b, 0)
    let awayFouls = foulStackB_IN.slice(0, Number(foulsIn[1]) > 6 ? 6 : Number(foulsIn[1]) + correction[1]).reduce((a, b) => a + b, 0)
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('BALL_POSSESION_OUT') + homeFouls + awayFouls
  }
  static redsIn (reds) {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('BALL_POSSESION_OUT') + homeFouls + awayFouls
  }
  static redsOut (reds) {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('BALL_POSSESION_OUT') + homeFouls + awayFouls
  }
  static statistics (data, time) {
    console.log(data)
    return Viz.setScene(Viz.project, 'STATISTIC') +
      Viz.animationStart('STATISTIC_IN') +
      Viz.setTextBasic('H_01', `${data.ballPoss[0]}%`) +
      Viz.setTextBasic('A_01', `${data.ballPoss[1]}%`) +
      Viz.setTextBasic('H_02', `${data.shots[0]}`) +
      Viz.setTextBasic('A_02', `${data.shots[1]}`) +
      Viz.setTextBasic('H_03', `${data.attempts[0]}`) +
      Viz.setTextBasic('A_03', `${data.attempts[1]}`) +
      Viz.setTextBasic('H_04', `${data.corners[0]}`) +
      Viz.setTextBasic('A_04', `${data.corners[1]}`) +
      Viz.setTextBasic('H_05', `${data.offsides[0]}`) +
      Viz.setTextBasic('A_05', `${data.offsides[1]}`) +
      Viz.setTextBasic('H_06', `${data.passed[0]}`) +
      Viz.setTextBasic('A_06', `${data.passed[1]}`) +
      Viz.setTextBasic('H_07', `(${data.completed[0]})`) +
      Viz.setTextBasic('A_07', `(${data.completed[1]})`) +
      Viz.setTextBasic('H_08', `${data.fouls[0][0] + data.fouls[0][1]}`) +
      Viz.setTextBasic('A_08', `${data.fouls[1][0] + data.fouls[1][1]}`) +
      Viz.setTextBasic('H_09', `${data.yellows[0][0] + data.yellows[0][1]}`) +
      Viz.setTextBasic('A_09', `${data.yellows[1][0] + data.yellows[1][1]}`) +
      Viz.setTextBasic('H_10', `${data.reds[0][0] + data.reds[0][1]}`) +
      Viz.setTextBasic('A_10', `${data.reds[1][0] + data.reds[1][1]}`) +
      Viz.setTextBasic('TIME', `${time}`) +
      Viz.setTextBasic('SCORE_01', `${data.goals[0]}`) +
      Viz.setTextBasic('SCORE_02', `${data.goals[1]}`)
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
      Viz.setTextBasic('SCORE', data.score) +
      Viz.setTextBasic('PERIOD', data.period) +
      dataString +
      Viz.animationStart('MATCH_SCORE_IN')
  }
  static matchScore_OUT (data) {
    return Viz.animationStart('MATCH_SCORE_OUT')
  }
  static updateTimeMatchScore () {
    return Viz.setTextBasic('CLOCK', clock[0])
  }
  static shootout (data) {
    const getStateString = (state) => {
      let outputString = ''
      const flatArr = [...state[0], ...state[1]]
      console.log(state)
      console.log(flatArr)
      flatArr.map((code, iter) => {
        switch (code) {
          case 0: outputString += Viz.setNonActive(`Z_${iter + 1}`) + Viz.setNonActive(`G_${iter + 1}`)
            break
          case 1: outputString += Viz.setActive(`Z_${iter + 1}`) + Viz.setNonActive(`G_${iter + 1}`)
            break
          case 2: outputString += Viz.setNonActive(`Z_${iter + 1}`) + Viz.setActive(`G_${iter + 1}`)
            break
          default: console.log('watafak ' + code)
        }
      })
      return outputString
    }
    return Viz.setScene(Viz.project, 'PENALTY_SHOOTOUT') +
      Viz.setLogo('LOGO_1', gameData[0].logoA) +
      Viz.setLogo('LOGO_2', gameData[0].logoB) +
      Viz.setTextBasic('TEAM_1', gameData[0].teamA) +
      Viz.setTextBasic('TEAM_2', gameData[0].teamB) +
      Viz.setTextBasic('SCORE', `${data.score[0]}-${data.score[1]}`) +
      getStateString(data.stateOfButtons) +
      Viz.animationStart('PENALTY_SHOOTOUT_IN')
  }
  static shootout_OUT (data) {
    return Viz.animationStart('PENALTY_SHOOTOUT_OUT')
  }
  static updateShootout (data) {
    const getStateString = (state) => {
      let outputString = ''
      const flatArr = [...state[0], ...state[1]]
      console.log(state)
      console.log(flatArr)
      flatArr.map((code, iter) => {
        switch (code) {
          case 0: outputString += Viz.setNonActive(`Z_${iter + 1}`) + Viz.setNonActive(`G_${iter + 1}`)
            break
          case 1: outputString += Viz.setActive(`Z_${iter + 1}`) + Viz.setNonActive(`G_${iter + 1}`)
            break
          case 2: outputString += Viz.setNonActive(`Z_${iter + 1}`) + Viz.setActive(`G_${iter + 1}`)
            break
          default: console.log('watafak ' + code)
        }
      })
      return outputString
    }
    return Viz.setScene(Viz.project, 'PENALTY_SHOOTOUT') +
      Viz.setLogo('LOGO_1', gameData[0].logoA) +
      Viz.setLogo('LOGO_2', gameData[0].logoB) +
      Viz.setTextBasic('TEAM_1', gameData[0].teamA) +
      Viz.setTextBasic('TEAM_2', gameData[0].teamB) +
      Viz.setTextBasic('SCORE', `${data.score[0]}-${data.score[1]}`) +
      getStateString(data.stateOfButtons)
  }
  static shootoutSmall (data) {
    const getStateString = (state) => {
      let outputString = ''
      const flatArr = [state[0], state[1]]
      console.log(state)
      console.log(flatArr)
      flatArr.map((code, iter) => {
        switch (code) {
          case 0: outputString += Viz.setNonActive(`Z_${iter + 1}`) + Viz.setNonActive(`G_${iter + 1}`)
            break
          case 1: outputString += Viz.setActive(`Z_${iter + 1}`) + Viz.setNonActive(`G_${iter + 1}`)
            break
          case 2: outputString += Viz.setNonActive(`Z_${iter + 1}`) + Viz.setActive(`G_${iter + 1}`)
            break
          default: console.log('watafak ' + code)
        }
      })
      return outputString
    }
    return Viz.setScene(Viz.project, 'SHOOTOUT') +
      Viz.setLogo('LOGO_1', gameData[0].logoA) +
      Viz.setLogo('LOGO_2', gameData[0].logoB) +
      Viz.setTextBasic('TEAM_SHORT_1', gameData[0].logoA) +
      Viz.setTextBasic('TEAM_SHORT_2', gameData[0].logoB) +
      Viz.setTextBasic('SCORE', `${data.score[0]}-${data.score[1]}`) +
      getStateString(data.stateOfButtons) +
      Viz.animationStart('SHOOTOUT_IN')
  }
  static shootout_small_OUT (data) {
    return Viz.animationStart('SHOOTOUT_OUT')
  }
  static updateShootoutSmall (data) {
    const getStateString = (state) => {
      let outputString = ''
      const flatArr = [state[0], state[1]]
      console.log(state)
      console.log(flatArr)
      flatArr.map((code, iter) => {
        switch (code) {
          case 0: outputString += Viz.setNonActive(`Z_${iter + 1}`) + Viz.setNonActive(`G_${iter + 1}`)
            break
          case 1: outputString += Viz.setActive(`Z_${iter + 1}`) + Viz.setNonActive(`G_${iter + 1}`)
            break
          case 2: outputString += Viz.setNonActive(`Z_${iter + 1}`) + Viz.setActive(`G_${iter + 1}`)
            break
          default: console.log('watafak ' + code)
        }
      })
      return outputString
    }
    return Viz.setScene(Viz.project, 'SHOOTOUT') +
      Viz.setLogo('LOGO_1', gameData[0].logoA) +
      Viz.setLogo('LOGO_2', gameData[0].logoB) +
      Viz.setTextBasic('TEAM_SHORT_1', gameData[0].logoA) +
      Viz.setTextBasic('TEAM_SHORT_2', gameData[0].logoB) +
      Viz.setTextBasic('SCORE', `${data.score[0]}-${data.score[1]}`) +
      getStateString(data.stateOfButtons)
  }
  static schedule () {
    return Viz.setScene(Viz.project, 'MATCH_SCHEDULE') + Viz.animationStart('MATCH_SCHEDULE_IN')
  }
  static schedule_OUT () {
    return Viz.setScene(Viz.project, 'MATCH_SCHEDULE') + Viz.animationStart('MATCH_SCHEDULE_OUT')
  }
  static nextMatch () {
    return Viz.setScene(Viz.project, 'NEXT_MATCH') + Viz.animationStart('NEXT_MATCH_IN')
  }
  static nextMatch_OUT () {
    return Viz.setScene(Viz.project, 'NEXT_MATCH') + Viz.animationStart('NEXT_MATCH_OUT')
  }
  static multiFlash () {
    return Viz.setScene(Viz.project, 'MULTI_FLASH') + Viz.animationStart('MULTI_FLASH_IN')
  }
  static multiFlash_OUT () {
    return Viz.setScene(Viz.project, 'MULTI_FLASH') + Viz.animationStart('MULTI_FLSH_OUT')
  }
}

module.exports = VizCommands
