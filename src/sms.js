export function sendSMS(number, message) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("client_id", "62990447cfa0e");
  urlencoded.append("client_key", "62990470c1c54");
  urlencoded.append("notify_key", "6299053f3eb29");
  urlencoded.append("notify_type", "SMS");
  urlencoded.append("sendto", number);
  urlencoded.append("message", message);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(
    "https://chcr-services.med.umich.edu/api/v1/notifications/send",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
