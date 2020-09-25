export const pct = (numerator: number, denominator: number) => {
  return Math.round((numerator / denominator + Number.EPSILON) * 100)
}

export const ReplaceAll = (input: string, toReplace: string, replaceWith: string) => {
  while (input.includes(toReplace)) {
    input = input.replace(toReplace, replaceWith);
  }

  return input;
}