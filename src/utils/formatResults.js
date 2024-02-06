module.exports = formatResults;

const pb = {
  leGreen: "<:lefte:1204442693711826975>",
  meGreen: "<:middlee:1204442672237121557>",
  reGreen: "<:righte:1204442656017748048>",
  lfGreen: "<:leftf:1204442691296038932>",
  mfGreen: "<:middlef:1204442652259520612>",
  rfGreen: "<:rightf:1204442632298963037>",
  leRed: "<:LER:1204442688854950009>",
  meRed: "<:MER:1204442674166374450>",
  reRed: "<:RER:1204442630319247380>",
  lfRed: "<:LFR:1204442670840291349>",
  mfRed: "<:MFR:1204442653924786206>",
  rfRed: "<:RFR:1204442634274209883>",
};

function calculateColor(upvotePercentage, downvotePercentage) {
  if (upvotePercentage === 0) {
    return "red"; // All downvotes, set to red
  } else if (downvotePercentage === 0) {
    return "green"; // All upvotes, set to green
  } else {
    return "mixed"; // Mixed votes, set to a mix of green and red
  }
}

function formatResults(upvotes = [], downvotes = []) {
  const totalVotes = upvotes.length + downvotes.length;
  const progressBarLength = 26; // Set the length to 26

  const upvotePercentage = upvotes.length / totalVotes;
  const downvotePercentage = downvotes.length / totalVotes;

  const color = calculateColor(upvotePercentage, downvotePercentage);

  const halfProgressBarLength = progressBarLength / 2;
  const filledSquaresGreen =
    Math.min(
      Math.round(upvotePercentage * halfProgressBarLength),
      halfProgressBarLength
    ) || 0;
  const filledSquaresRed =
    Math.min(
      Math.round(downvotePercentage * halfProgressBarLength),
      halfProgressBarLength
    ) || 0;

  const upPercentage = upvotePercentage * 100 || 0;
  const downPercentage = downvotePercentage * 100 || 0;

  const progressBar =
    color === "red"
      ? pb.lfRed + pb.mfRed.repeat(halfProgressBarLength) + pb.rfRed
      : color === "green"
      ? pb.lfGreen + pb.mfGreen.repeat(halfProgressBarLength) + pb.rfGreen
      : (filledSquaresGreen ? pb.lfGreen : pb.leGreen) +
        (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
        (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
        (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
        (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
        (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
        (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
        (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
        (filledSquaresRed ? pb.mfRed : pb.meRed) +
        (filledSquaresRed ? pb.mfRed : pb.meRed) +
        (filledSquaresRed ? pb.mfRed : pb.meRed) +
        (filledSquaresRed ? pb.mfRed : pb.meRed) +
        (filledSquaresRed ? pb.mfRed : pb.meRed) +
        (filledSquaresRed ? pb.mfRed : pb.meRed) +
        (filledSquaresRed ? pb.mfRed : pb.meRed) +
        (filledSquaresRed ? pb.rfRed : pb.reRed);

  const results = [];
  results.push(
    `:thumbsup: ${upvotes.length} upvotes (${upPercentage.toFixed(
      1
    )}%) • :thumbsdown: ${downvotes.length} downvotes (${downPercentage.toFixed(
      1
    )}%)`
  );
  results.push(progressBar);

  return results.join("\n");
}

module.exports = formatResults;
