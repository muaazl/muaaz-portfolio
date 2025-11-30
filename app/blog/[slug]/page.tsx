import connectDB from "@/lib/db";
import Post from "@/lib/models/post";
import ReactMarkdown from "react-markdown";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPost(props: { params: Promise<{ slug: string }> | { slug: string } }) {
  const params = await props.params;
  await connectDB();
  const post = await Post.findOne({ slug: params.slug });

  if (!post) return <div>404 - Neural link severed.</div>;

  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-3xl mx-auto">
      <Link href="/blog" className="inline-flex items-center text-muted hover:text-white mb-8 group">
        <FaArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Return to Buffer
      </Link>
      
      <header className="mb-12 border-b border-white/10 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <span>•</span>
          <div className="flex gap-2">
            {post.tags.map((t: string) => <span key={t}>#{t}</span>)}
          </div>
        </div>
      </header>

      {/* The 'prose' class comes from @tailwindcss/typography */}
      <article className="prose prose-invert prose-lg prose-headings:text-white prose-p:text-muted-foreground prose-a:text-accent-1 prose-code:text-accent-1 prose-pre:bg-surface/50 max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}