import { Card, CardHeader } from "@/components/ui/card";

export default function GenericPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="w-full flex-1">
      <Card className="min-h-[500px] flex flex-col">
        <CardHeader title={title} eyebrow="Page" />
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          {description}
        </div>
      </Card>
    </div>
  );
}
