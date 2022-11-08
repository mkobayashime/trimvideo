import { spawn } from "child_process"
import rl from "node:readline"

import { calcDiffSeconds } from "./calcDiffSeconds"
import { requestTimestamp } from "./requestTimestamp"

//
void (async () => {
  const args = process.argv.slice(2)

  if (args.length < 1) {
    console.error("Fatal: Original video path not provided.")
    process.exit(1)
  }
  if (args.length < 2) {
    console.error("Fatal: Dist path not provided.")
    process.exit(1)
  }

  const [src, dist] = args

  const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: (line: string) => {
      if (line === "") return []
      if (line.endsWith(":")) return []
      if (line.split(":").length === 3) return []

      return [[`${line}:`], line]
    },
  })

  const startsAt = await requestTimestamp(readline, "starts at: ")
  const endsAt = await requestTimestamp(readline, "ends at: ")

  readline.close()

  const diffSeconds = calcDiffSeconds({ startsAt, endsAt })
  if (!diffSeconds) {
    console.error("Fatal: EndsAt must not be less than startsAt.")
    process.exit(1)
  }

  spawn(
    "ffmpeg",
    [
      "-ss",
      `${startsAt.hour}:${startsAt.minute}:${startsAt.second}`,
      "-i",
      src,
      "-t",
      diffSeconds.toString(),
      dist,
    ],
    { stdio: "inherit" }
  )
})()
