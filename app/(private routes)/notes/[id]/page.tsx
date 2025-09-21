import { Metadata } from "next";

import {
  QueryClient,
  HydrationBoundary,
  dehydrate
} from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/clientApi";

import NoteDetailsClient from "./NoteDetails.client";

interface Props {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const note = await fetchNoteById(id);

    return {
        title: `Note - ${note.title}`,
        description: note.content,
        openGraph: {
            title: `Note - ${note.title}`,
            description: note.content,
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