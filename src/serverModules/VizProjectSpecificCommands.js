const Viz = require('./VizCoreCommands')


class VizCommands {
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
    const correction = [foulsIn[0] > 0 ? 1 : 0, foulsIn[1] > 0 ? 1 : 0]
    let homeFouls = foulStackA_IN.slice(0, Number(foulsIn[0]) > 6 ? 6 : Number(foulsIn[0]) + correction[0]).reduce((a, b) => a + b, 0)
    let awayFouls = foulStackB_IN.slice(0, Number(foulsIn[1]) > 6 ? 6 : Number(foulsIn[1]) + correction[1]).reduce((a, b) => a + b, 0)

    let clockString
    switch(Number(time)) {
      case 0: clockString = '1st'
        break
      case 1: clockString = '1st'
        break
      case 2: clockString = '2nd'
        break
      case 3: clockString = 'ET1'
        break
      case 4: clockString = 'ET2'
        break
      case 5: clockString = 'END'
        break
      case 6: clockString = 'PEN'
        break
      default: clockString = ''
    }

    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('CLOCK_IN') +
      Viz.setTextBasic('TEAM_1', gameData[0].logoA) + Viz.setTextBasic('TEAM_2', gameData[0].logoB) +
      Viz.setTextBasic('HALF', clockString) +
      Viz.setTextBasic('SCORE', `${score[0]}-${score[1]}`) + homeFouls + awayFouls
  }
  static clock_OUT () {
    return [
      Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('CLOCK_OUT') +
      foulStackA_OUT[Number(foulsIn[0]) < 6 ?  Number(foulsIn[0]) : 5] +
      foulStackB_OUT[Number(foulsIn[1]) < 6 ?  Number(foulsIn[1]) : 5], ''
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
    if (fouls[0] != foulsIn[0]) homeFouls = foulStackA_IN[fouls[0]]
    if (fouls[1] != foulsIn[1]) awayFouls = foulStackB_IN[fouls[1]]

    foulsIn = fouls
    console.log(foulsIn)
    return Viz.setScene(Viz.project, 'CLOCK') +
      Viz.setTextBasic('SCORE', `${score[0]}-${score[1]}`) + homeFouls + awayFouls
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
  static yellow () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('YELLOW_CARD_IN') +
      Viz.setTextBasic('PLAYER_YELLOW', `${currentPlayer.number} ${currentPlayer.surname}`) +
      foulStackA_OUT[Number(foulsIn[0]) < 6 ?  Number(foulsIn[0]) : 5] +
      foulStackB_OUT[Number(foulsIn[1]) < 6 ?  Number(foulsIn[1]) : 5] +
      Viz.setLogo('LOGO_1_YELLOW', currentPlayer.isTeamA  == 0? gameData[0].logoA : gameData[0].logoB)
  }
  static yellow_OUT () {
    const correction = [foulsIn[0] > 0 ? 1 : 0, foulsIn[1] > 0 ? 1 : 0]
    let homeFouls = foulStackA_IN.slice(0, Number(foulsIn[0]) > 6 ? 6 : Number(foulsIn[0]) + correction[0]).reduce((a, b) => a + b, 0)
    let awayFouls = foulStackB_IN.slice(0, Number(foulsIn[1]) > 6 ? 6 : Number(foulsIn[1]) + correction[1]).reduce((a, b) => a + b, 0)
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('YELLOW_CARD_OUT') + homeFouls + awayFouls
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
  static doubleYellow () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('DOUBLE_YELLOW_IN') +
      Viz.setTextBasic('PLAYER_DOUBLE_YELLOW', `${currentPlayer.number} ${currentPlayer.surname}`) +
      foulStackA_OUT[Number(foulsIn[0]) < 6 ?  Number(foulsIn[0]) : 5] +
      foulStackB_OUT[Number(foulsIn[1]) < 6 ?  Number(foulsIn[1]) : 5] +
      Viz.setLogo('LOGO_1_DOUBLE_YELLOW', currentPlayer.isTeamA == 0 ? gameData[0].logoA : gameData[0].logoB)
  }
  static doubleYellow_OUT () {

    const correction = [foulsIn[0] > 0 ? 1 : 0, foulsIn[1] > 0 ? 1 : 0]
    let homeFouls = foulStackA_IN.slice(0, Number(foulsIn[0]) > 6 ? 6 : Number(foulsIn[0]) + correction[0]).reduce((a, b) => a + b, 0)
    let awayFouls = foulStackB_IN.slice(0, Number(foulsIn[1]) > 6 ? 6 : Number(foulsIn[1]) + correction[1]).reduce((a, b) => a + b, 0)
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('DOUBLE_YELLOW_OUT') + homeFouls + awayFouls
  }
  static red () {
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('RED_CARD_IN') +
      Viz.setTextBasic('PLAYER_RED', `${currentPlayer.number} ${currentPlayer.surname}`) +
      foulStackA_OUT[Number(foulsIn[0]) < 6 ?  Number(foulsIn[0]) : 5] +
      foulStackB_OUT[Number(foulsIn[1]) < 6 ?  Number(foulsIn[1]) : 5] +
      Viz.setLogo('LOGO_1_RED', currentPlayer.isTeamA == 0 ? gameData[0].logoA : gameData[0].logoB)
  }
  static red_OUT () {

    const correction = [foulsIn[0] > 0 ? 1 : 0, foulsIn[1] > 0 ? 1 : 0]
    let homeFouls = foulStackA_IN.slice(0, Number(foulsIn[0]) > 6 ? 6 : Number(foulsIn[0]) + correction[0]).reduce((a, b) => a + b, 0)
    let awayFouls = foulStackB_IN.slice(0, Number(foulsIn[1]) > 6 ? 6 : Number(foulsIn[1]) + correction[1]).reduce((a, b) => a + b, 0)
    return Viz.setScene(Viz.project, 'CLOCK') + Viz.animationStart('RED_CARD_OUT') + homeFouls + awayFouls
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
