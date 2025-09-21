import { Metadata } from "next";

import {
  QueryClient,
  HydrationBoundary,
  dehydrate
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api/clientApi";

import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag: string = slug[0] === "All" ? "All" : slug[0];

  return {
    title: `Notes - ${tag}`,
    description: `Showing notes with ${tag} filter.`,
    openGraph: {
      title: `Notes - ${tag}`,
      description: `Showing notes with ${tag} filter.`,
      url: `${process.env.NEXT_PUBLIC_API_URL}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub icon."
        }
      ]
    }
  };
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const tag: undefined | string = slug[0] === "All" ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes("", 1, tag)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}