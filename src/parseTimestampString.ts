import type { TimeValues } from "./types"

export const parseTimestampString = (
  time: string
):
  | TimeValues
  | {
      error: "NaN" | "invalidLength" | "invalidSeconds" | "invalidMinutes"
    } => {
  const validateSecondsAndMinutes = ({
    hour,
    minute,
    second,
  }: TimeValues):
    | TimeValues
    | { error: "invalidSeconds" | "invalidMinutes" } => {
    if (minute > 60 || minute < 0) {
      return { error: "invalidMinutes" }
    }
    if (second > 60 || second < 0) {
      return { error: "invalidSeconds" }
    }
    return { hour, minute, second }
  }

  const splitted = time.split(":")

  if (!splitted.every((numberLike) => !isNaN(parseInt(numberLike)))) {
    return { error: "NaN" }
  }

  if (splitted.length === 0 || splitted.length > 3)
    return { error: "invalidLength" }

  if (splitted.length === 1) {
    const second = parseInt(splitted[0])

    return validateSecondsAndMinutes({
      hour: 0,
      minute: 0,
      second,
    })
  }

  if (splitted.length === 2) {
    const minute = parseInt(splitted[0])
    const second = parseInt(splitted[1])

    return validateSecondsAndMinutes({
      hour: 0,
      minute,
      second,
    })
  }

  const hour = parseInt(splitted[0])
  const minute = parseInt(splitted[1])
  const second = parseInt(splitted[2])
  return validateSecondsAndMinutes({
    hour,
    minute,
    second,
  })
}
