import Link from "next/link";
import connectDB from "@/lib/db";
import Post from "@/lib/models/post";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  await connectDB();
  const posts = await Post.find({}).sort({ publishedAt: -1 });

  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Thought Buffer</h1>
        <p className="text-muted text-lg">
          Dumps from the neural network. Dev logs, tutorials, and hot takes.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug}`}>
            <article className="group p-6 rounded-2xl border border-white/5 bg-surface/30 hover:bg-surface/50 hover:border-accent-1/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white group-hover:text-accent-1 transition-colors">
                  {post.title}
                </h2>
                <span className="text-sm text-muted-foreground font-mono">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex gap-2">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="bg-white/5 text-muted-foreground">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}