import GenericPage from "@/components/generic-page";

export default async function TopicRoute({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const decodedTopic = decodeURIComponent(topic).replace(/-/g, " ");
  
  return (
    <GenericPage 
      title={decodedTopic} 
      description={`Study materials, notes, and resources for ${decodedTopic} will be loaded here.`} 
    />
  );
}
