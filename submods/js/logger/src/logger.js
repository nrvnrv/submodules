import fetch from "node-fetch";

export async function sendLog(logUrl, logLevel, logMessage, logParams) {
  let logHttpBody = {
    log_level: logLevel,
    log_message: logMessage,
    log_params: logParams,
  };
  const response = await fetch(logUrl, {
    method: "POST",
    body: JSON.stringify(logHttpBody),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  console.log(data);
}
