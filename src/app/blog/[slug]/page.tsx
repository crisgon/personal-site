interface BlogPostProps {
  params: {slug: string}
}
export default function BlogPost({params}: BlogPostProps) {
  return params.slug
}