import { useState, useEffect } from "react";
import { fetchNotes } from "../../services/noteServices";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes({ page: currentPage, perPage }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data) return;
    if (currentPage > data.totalPages) {
      setCurrentPage(data.totalPages || 1);
    }

    if (!isLoading && !isFetching && data.notes.length === 0) {
      toast("No such note found", { icon: "ℹ️", duration: 3000 });
    }
  }, [data, currentPage, isLoading, isFetching]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />

        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button}>Create note +</button>
      </header>

      {isLoading && <strong>Loading notes...</strong>}
      {isError && <div>Error loading notes</div>}

      {data && !isLoading && <NoteList notes={data.notes} />}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "8px",
            padding: "16px 24px",
          },
        }}
      />
    </div>
  );
}
