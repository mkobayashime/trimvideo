import rl, { Interface as ReadlineInterface } from "node:readline"

import { parseTimestampString } from "./parseTimestampString"

const readKeyboardInput = async (
  readline: ReadlineInterface,
  prompt: string
): Promise<string> =>
  new Promise((resolve) => {
    readline.question(prompt, (str) => resolve(str))
  })

export const requestTimestamp = async (
  readline: ReadlineInterface,
  prompt: string
) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const input = await readKeyboardInput(readline, prompt)

    const parsed = parseTimestampString(input)
    if (!("error" in parsed)) return parsed

    switch (parsed.error) {
      case "NaN": {
        console.log("Error: NaN passed. Try again.")
        break
      }
      case "invalidLength": {
        console.log("Error: Invalid timestamp. Try again.")
        break
      }
      case "invalidSeconds": {
        console.log("Error: Seconds value has to be between 0-60. Try again.")
        break
      }
      case "invalidMinutes": {
        console.log("Error: Minutes value has to be between 0-60. Try again.")
        break
      }
    }
  }
}
