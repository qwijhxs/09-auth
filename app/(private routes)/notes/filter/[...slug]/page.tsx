import {
  QueryClient,
  HydrationBoundary,
  dehydrate
} from "@tanstack/react-query";
import { Metadata } from "next";
import { serverNotesApi } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug: string[] }>;
}

interface GenerateMetadataProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const filterName = tag || "All notes";
  
  return {
    title: `${filterName} - NoteHub`,
    description: `Browse ${filterName.toLowerCase()} in NoteHub. Manage and organize your notes with easy filtering options.`,
    openGraph: {
      title: `${filterName} - NoteHub`,
      description: `Browse ${filterName.toLowerCase()} in NoteHub. Manage and organize your notes with easy filtering options.`,
      url: `https://your-app-url.com/notes/filter/${slug.join('/')}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${filterName} Filter`,
        },
      ],
      type: "website",
    },
  };
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => serverNotesApi.getNotes("", 1, tag)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}