window.addEventListener("DOMContentLoaded", () => {
  const url = location.href.replace("index.html", "ar.html");

  const canvas = document.createElement("canvas");

  QRCode.toCanvas(canvas, url, {
    width: 180
  }, function (err) {
    if (err) console.error(err);
    document.getElementById("qr").appendChild(canvas);
  });
});