const prerequisites = [
  {
    preId: 1,
    preTitre: "Introduction to Programming",
    preNb_Points: 10,
    preMessage_Reussi: "Congratulations, you passed!",
    preMessage_Rate: "Please try again.",
    preReussi: true,
    preDescription: "Basic introduction to programming concepts.",
    exeId: 1,
  },
  {
    preId: 2,
    preTitre: "Advanced Mathematics",
    preNb_Points: 20,
    preMessage_Reussi: "Well done, you succeeded!",
    preMessage_Rate: "Failure, better luck next time.",
    preReussi: false,
    preDescription: "In-depth study of advanced mathematical theories.",
    exeId: 1,
  },
  {
    preId: 3,
    preTitre: "History of Science",
    preNb_Points: 15,
    preMessage_Reussi: "You passed the prerequisite!",
    preMessage_Rate: "You did not pass, try again.",
    preReussi: true,
    preDescription: "An overview of the major developments in science.",
    exeId: 1,
  },
];

export { prerequisites };
