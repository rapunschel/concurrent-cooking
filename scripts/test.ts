const query = "soup -t 45 -m smthg -n 2 -c vegetarian hot";

const getKeyString = (cmd: string) => {
  for (const key of Object.keys(cmds)) {
    if (cmds[key].includes(cmd)) return key;
  }
  return "";
};

const cmds: Record<string, any> = {
  time: ["-t", "--time"],
  minThreads: ["-n", "--cpus"],
  user: ["-u", "--users"],
  tag: ["-c", "--cat"],
};

const words = query.split(" ");
let currCmd = "title";
let queryRecord = {} as Record<string, any>;
for (const word of words) {
  if (getKeyString(word)) {
    currCmd = getKeyString(word);
    continue;
  }

  if (!queryRecord[currCmd]) queryRecord[currCmd] = [];
  queryRecord[currCmd].push(word);
}

console.log(queryRecord);
