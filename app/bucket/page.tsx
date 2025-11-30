import BucketList from "@/components/bucket-list"; // The wrapper we just made
import connectDB from "@/lib/db";
import Bucket from "@/lib/models/bucket";

export const dynamic = 'force-dynamic';

interface BucketItemType {
  _id: string;
  title: string;
  status: "not-started" | "in-progress" | "done";
}

export default async function BucketPage() {
  await connectDB();
  const items = await Bucket.find({});

  const plainItems: BucketItemType[] = items.map(doc => ({
    _id: doc._id.toString(),
    title: doc.title,
    status: doc.status as "not-started" | "in-progress" | "done"
  }));

  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-3xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-white">Achievement Board</h1>
        <p className="text-muted">
          Tracking life progress. Updates are saved to the live database.
        </p>
      </div>
      <BucketList initialItems={plainItems} />
    </main>
  );
}