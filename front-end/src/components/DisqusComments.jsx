import { DiscussionEmbed } from "disqus-react"
export function DisqusComments({ post }) {
  console.log(post)
  const disqusShortname = "fcbvttn"
  const disqusConfig = {
    url: "https://fcbvttn.disqus.com/",
    identifier: post._id, // Single post id
    title: post.title, // Single post title
  }
  return (
    <div className="mt-10">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  )
}
