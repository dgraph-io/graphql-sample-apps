import React from "react"

const months = ["Jan.","Feb.","Mar.","Apr.","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."];

const timeAgo = (date: Date|string): string => {
  const rel = new Date(date)
  const now = new Date()
  const diff = Math.floor((now.getTime() - rel.getTime()) / 1000);
  if (diff <= 1) return "just now";
  if (diff < 10) return "a few secs ago";
  if (diff < 40) return diff + " secs ago";
  if (diff <= 90) return "a min ago";
  if (diff <= 3540) return Math.round(diff / 60) + " min ago";
  if (diff <= 5400) return "1 hr ago";
  if (diff <= 86400) return Math.round(diff / 3600) + " hrs ago";
  if (diff <= 129600) return "1 day ago";
  if (diff < 604800) return Math.round(diff / 86400) + " days ago";
  if (diff <= 777600) return "1 wk ago";
  if (now.getFullYear() === rel.getFullYear()) {return `on ${months[rel.getMonth()]} ${rel.getDate()}`}
  return `on ${months[rel.getMonth()]} ${rel.getDate()} ${rel.getFullYear()}`
}

const TimeAgo: React.FC<{date: Date}> = ({date}) => {
  return <>{timeAgo(date)}</>
}

export default TimeAgo