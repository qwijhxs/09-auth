import {
  QueryClient,
  HydrationBoundary,
  dehydrate
} from "@tanstack/react-query";
import { Metadata } from "next";

import { fetchNoteById } from "@/lib/api/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: Promise<{ id: string }>
}

interface GenerateMetadataProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const note = await fetchNoteById(id);
    
    return {
      title: `${note.title} - NoteHub`,
      description: note.content.length > 150 
        ? `${note.content.substring(0, 150)}...` 
        : note.content,
      openGraph: {
        title: `${note.title} - NoteHub`,
        description: note.content.length > 150 
          ? `${note.content.substring(0, 150)}...` 
          : note.content,
        url: `https://your-app-url.com/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: `NoteHub - ${note.title}`,
          },
        ],
        type: "article",
      },
    };
  } catch (error) {
    return {
      title: "Note Not Found - NoteHub",
      description: "The requested note could not be found. It may have been deleted or moved.",
      openGraph: {
        title: "Note Not Found - NoteHub",
        description: "The requested note could not be found. It may have been deleted or moved.",
        url: `https://your-app-url.com/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub - Note Not Found",
          },
        ],
        type: "website",
      },
    };
  }
}

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}