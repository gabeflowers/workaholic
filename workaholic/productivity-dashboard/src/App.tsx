import KanbanBoard from "@/components/KanbanBoard";
import NoteWall from "@/components/NoteWall";
import Clock from "@/components/Clock";
import SpotifyEmbed from "@/components/SpotifyEmbed";

export default function App() {
  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr_auto] gap-4 p-4">
      <header className="flex justify-center">
        <Clock />
      </header>

      <main className="grid grid-cols-[2fr_1fr] gap-4">
        <KanbanBoard />
        <NoteWall />
      </main>

      <footer className="min-h-[90px]">
        <SpotifyEmbed />
      </footer>
    </div>
  );
}
