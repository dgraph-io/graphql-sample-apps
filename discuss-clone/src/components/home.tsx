import React from "react"
import { PostFeed } from "./posts"

export function Home() {
  return <div className="layout-margin">{PostFeed()}</div>
}
