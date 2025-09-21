import {
  QueryClient,
  HydrationBoundary,
  dehydrate
} from "@tanstack/react-query";

import { serverNotesApi } from '@/lib/api/serverApi';

import NotePreviewClient from "./NotePreview.client";

interface Props {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => serverNotesApi.getNoteById(id)
  });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient id={id} />
      </HydrationBoundary>
  );
};