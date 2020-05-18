const answerTypes = {
  LEFT: "left",
  RIGHT: "right",
  SCALE: (x) => x.toString(),
  OK: "ok",
  AGE: (age) => age.toString(),
};

export default answerTypes;
