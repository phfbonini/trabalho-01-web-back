const { server } = require("./server");
const port = 6060;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
