require("dotenv");

const shuffle = (input) => {
  let result = [];
  const n = input.length;
  for (let i = n - 1; i > 0; i--) {
    let j = process.env.RANDOM_SHUFFLE;
    let tmp = input[i];
    input[i] = input[j];
    input[j] = tmp;
    result.push(tmp);
  }
  return result.join("");
};
module.exports = shuffle;
