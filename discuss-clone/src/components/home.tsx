import React from "react"
import { PostFeed } from "./posts"
import { AppHeader } from "./header"

export function Home() {
    return (
        <div>
            {AppHeader()}
            {PostFeed()}
        </div>
    )
}