import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    onSpotifyIframeApiReady: (api: any) => void;
  }
}

export default function SpotifyEmbed() {
  const container = useRef<HTMLDivElement>(null);
  const [uri, setUri] = useState(
    () =>
      localStorage.getItem("spotify-uri") ??
      "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"
  );

  // carrega script só uma vez
  useEffect(() => {
    if (document.getElementById("spotify-embed")) return;
    const script = document.createElement("script");
    script.id = "spotify-embed";
    script.async = true;
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    document.body.appendChild(script);
  }, []);

  // (re)cria player sempre que mudar a URI
  useEffect(() => {
    if (!container.current) return;

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      IFrameAPI.createController(container.current, { uri });
    };
  }, [uri]);

  return (
    <div className="flex flex-col gap-2">
      <input
        placeholder="Cole link de música/playlist/álbum e ENTER..."
        className="rounded border p-1 text-sm"
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          const link = (e.target as HTMLInputElement).value.trim();
          if (!link) return;
          const newUri = link
            .replace("https://open.spotify.com/", "spotify:")
            .split("?")[0];
          setUri(newUri);
          localStorage.setItem("spotify-uri", newUri);
          (e.target as HTMLInputElement).value = "";
        }}
      />
      <div
        ref={container}
        className="h-[80px] min-h-[80px] w-full overflow-hidden rounded"
      />
    </div>
  );
}
