
/*
Define answer types for questions
*/
const answerTypes = {
  LEFT: "left",
  RIGHT: "right",
  SCALE: (x) => x.toString(),
  OK: "ok",
  AGE: (age) => age.toString(),
  TIME: (milisec) => milisec
};

export default answerTypes;
