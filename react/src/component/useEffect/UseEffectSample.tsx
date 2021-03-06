import { FC, useState, useEffect } from "react";

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const fetchPhoto = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/Photos");
  const photos = (await res.json()) as Photo[];
  return photos;
};

const UseEffectSample: FC = () => {
  /** state */
  const [count, setCount] = useState(0);
  const [Photos, setPhotos] = useState<Photo[]>([]);

  /** effect */
  useEffect(() => {
    fetchPhoto().then((photos) => setPhotos(photos));
  }, []);

  return (
    <div>
      <h1>useEffect sample</h1>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>click</button>
      <hr />
      <div>
        <table>
          <thead>
            <tr>
              <th>アルバムID</th>
              <th>ID</th>
              <th>タイトル</th>
              <th>URL</th>
              <th>サムネイルURL</th>
            </tr>
          </thead>
          <tbody>
            {Photos.map(({ albumId, id, title, url, thumbnailUrl }: Photo) => (
              <tr key={id}>
                <td>{albumId}</td>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                  <img src={url} alt="" width="100" height="100" />
                </td>
                <td>
                  <img src={thumbnailUrl} alt="" width="100" height="100" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UseEffectSample;
