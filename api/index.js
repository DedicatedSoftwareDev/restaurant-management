const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const fs = require("fs");
const events = JSON.parse(fs.readFileSync("./challenge_data.json", "utf8"));

// const sortedEvents = events.sort((a, b) => a.sent_at_second - b.sent_at_second);

// function sleep(duration) {
//   return new Promise(resolve => setTimeout(resolve, duration));
// }

io.on("connection", async function(socket) {
  console.log("a user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // let ticker = 0;
  // while (sortedEvents.length) {
  //   for (let i = 0; i < sortedEvents.length; i++) {
  //     if (sortedEvents[i].sent_at_second === ticker) {
  //       io.emit("new_event", JSON.stringify(sortedEvents[i]));
  //       sortedEvents.splice(0, 1);
  //     } else {
  //       break;
  //     }
  //   }

  //   await sleep(1000);
  //   ticker++;
  // }

  let currentIndex = 0;

  const interval = setInterval(() => {
    const currentEvents = events.filter(
      event => event.sent_at_second === currentIndex
    );
    currentEvents.forEach(event => io.emit("new_event", JSON.stringify(event)));

    currentIndex++;

    // clearInterval after all events have been processed
    if (currentIndex === events.length) {
      clearInterval(interval);
    }
  }, 1000);
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
