import server from "./server";

(() => {
  const API_PORT = 3030;

  server.listen(API_PORT, () => {
    console.info(`Server is running on http://localhost:${API_PORT}`);
  });
})();
