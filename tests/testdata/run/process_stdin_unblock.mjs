import process from "node:process";

function prompt() {
  process.stdin.setRawMode(true);

  const { promise, resolve } = Promise.withResolvers();

  const onData = (buf) => {
    process.stdin.setRawMode(false);
    process.stdin.removeListener("data", onData);
    console.log(String.fromCharCode(buf[0]));
    resolve();
  };

  process.stdin.on("data", onData);
  return promise;
}

await prompt();
await prompt();
Deno.exit(0);
