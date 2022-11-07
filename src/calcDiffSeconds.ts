import type { TimeValues } from "./types"

const calcSeconds = ({ hour, minute, second }: TimeValues) =>
  hour * 60 * 60 + minute * 60 + second

export const calcDiffSeconds = ({
  startsAt,
  endsAt,
}: {
  startsAt: TimeValues
  endsAt: TimeValues
}): number | null => {
  const startsAtSeconds = calcSeconds(startsAt)
  const endsAtSeconds = calcSeconds(endsAt)

  if (startsAtSeconds > endsAtSeconds) return null

  return endsAtSeconds - startsAtSeconds
}
