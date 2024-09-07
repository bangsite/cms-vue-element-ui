// type AxiosHeaders = "application/json" | "application/x-www-form-urlencoded" | "multipart/form-data";
//
// type AxiosMethod = "get" | "post" | "delete" | "put";
//
// type AxiosResponseType = "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";

export interface SpotifyAlbum {
  images: [];
  name: string;
  artists: [];
  total_tracks: number;
  release_date: string;
}
