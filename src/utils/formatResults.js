const pb = {
    le: '<:le:1203424282672369665>',
    me: '<:lf:1203424281611079771>',
    re: '<:me:1203424278997901455>',
    lf: '<:mf:1203424277693726801>',
    mf: '<:re:1203424276905201784>',
    rf: '<:rf:1203424274585485432>',
  };
  
  function formatResults(upvotes = [], downvotes = []) {
    const totalVotes = upvotes.length + downvotes.length;
    const progressBarLength = 14;
    const filledSquares = Math.round((upvotes.length / totalVotes) * progressBarLength) || 0;
    const emptySquares = progressBarLength - filledSquares || 0;
  
    if (!filledSquares && !emptySquares) {
      emptySquares = progressBarLength;
    }
  
    const upPercentage = (upvotes.length / totalVotes) * 100 || 0;
    const downPercentage = (downvotes.length / totalVotes) * 100 || 0;
  
    const progressBar =
      (filledSquares ? pb.lf : pb.le) +
      (pb.mf.repeat(filledSquares) + pb.me.repeat(emptySquares)) +
      (filledSquares === progressBarLength ? pb.rf : pb.re);
  
    const results = [];
    results.push(
      `👍 ${upvotes.length} upvotes (${upPercentage.toFixed(1)}%) • 👎 ${
        downvotes.length
      } downvotes (${downPercentage.toFixed(1)}%)`
    );
    results.push(progressBar);
  
    return results.join('\n');
  }
  
  module.exports = formatResults;