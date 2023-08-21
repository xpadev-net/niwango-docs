const removeTmAnnotation = (value: string) => {
  return value
    .split("\n")
    .map((val) =>
      val.replace(
        /^\[tm([0-9]+(?:\.[0-9]+)?|[0-9]+:[0-5]?[0-9](?:\.[0-9]+)?)]$/,
        ""
      )
    )
    .join("\n");
};

const convertToCommentFormat = (value: string) => {
  const lines = value.split("\n");
  const result = [];
  let tmpArr = [];
  let lastVpos = 0;
  for (const line of lines) {
    const match = line.match(
      /^\[tm([0-9]+(?:\.[0-9]+)?|[0-9]+:[0-5]?[0-9](?:\.[0-9]+)?)]$/
    );
    if (!match) {
      tmpArr.push(line);
      continue;
    }
    result.push({
      message: "/" + tmpArr.join("\n"),
      vpos: lastVpos * 100,
      isYourPost: false,
      mail: "invisible",
      fromButton: false,
      isPremium: false,
      color: 0,
      size: 1,
      no: result.length,
      _vpos: lastVpos,
      _owner: true,
    });
    tmpArr = [];
    lastVpos = time2vpos(match[1]);
  }
  result.push({
    message: "/" + tmpArr.join("\n"),
    vpos: lastVpos,
    isYourPost: false,
    mail: "invisible",
    fromButton: false,
    isPremium: false,
    color: 0,
    size: 1,
    no: result.length,
    _vpos: lastVpos,
    _owner: true,
  });
  return result;
};

/**

 * @param time_str 分:秒.秒・分:秒・秒.秒・秒
 * @returns vpos
 */
const time2vpos = (time_str: string): number => {
  const time = time_str.match(
    /^(?:(\d+):(\d+)\.(\d+)|(\d+):(\d+)|(\d+)\.(\d+)|(\d+))$/
  );
  if (time) {
    if (
      time[1] !== undefined &&
      time[2] !== undefined &&
      time[3] !== undefined
    ) {
      return (
        (Number(time[1]) * 60 + Number(time[2])) * 100 +
        Number(time[3]) / Math.pow(10, time[3].length - 2)
      );
    } else if (time[4] !== undefined && time[5] !== undefined) {
      return (Number(time[4]) * 60 + Number(time[5])) * 100;
    } else if (time[6] !== undefined && time[7] !== undefined) {
      return (
        Number(time[6]) * 100 +
        Number(time[7]) / Math.pow(10, time[7].length - 2)
      );
    } else if (time[8] !== undefined) {
      return Number(time[8]) * 100;
    }
  }
  return 0;
};

export { removeTmAnnotation, convertToCommentFormat };
