class Viz {
  static project = 'UEFA'
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
module.exports = Viz
