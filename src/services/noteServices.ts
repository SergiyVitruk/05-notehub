import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";
const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalItems: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "" } = params;
  const response = await axios.get<FetchNotesResponse>(`notes/`, {
    params: { page, perPage, search },
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });
  return response.data;
};

export const createNote = async (
  noteData: Pick<Note, "title" | "content" | "tag">
): Promise<Note> => {
  const response = await axios.post<Note>("/notes", noteData, {
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return res.data;
};
