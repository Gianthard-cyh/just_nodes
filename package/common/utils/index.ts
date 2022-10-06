import { rand, useTimestamp } from "@vueuse/core"

export function uid() {
  const timeStamp = useTimestamp().value
  const uid = timeStamp.toString() + rand(0, 1000000).toString()

  return { timeStamp, uid }
}
