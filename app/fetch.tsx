export default function fetchGET(url: string): Promise<any> {
  return (
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
  );
}
