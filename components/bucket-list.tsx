"use client";
import BucketItem from "./bucket-item";

type BucketItemType = {
  _id: string;
  title: string;
  status: "not-started" | "in-progress" | "done";
};

export default function BucketList({ initialItems }: { initialItems: BucketItemType[] }) {
  return (
    <div className="space-y-4">
      {initialItems.map((item) => (
        <BucketItem 
          key={item._id}
          id={item._id}
          title={item.title}
          status={item.status}
        />
      ))}
    </div>
  );
}