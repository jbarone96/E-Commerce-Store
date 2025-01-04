export const displayDate = (timestamp) => {
  const date = new Date(timestamp);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${months[month]} ${day}, ${year}`;
};

export const displayCurrency = (n) => {
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return format.format(n);
};

export const calculateCartTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;

  const total = arr.reduce((acc, val) => acc + val, 0);

  return total.toFixed(2);
};

export const displayToast = (msg, status = "info") => {
  const div = document.createElement("div");
  const span = document.createElement("span");

  div.className = `toast ${
    status === "info"
      ? "toast-info"
      : status === "success"
      ? "toast-success"
      : "toast-error"
  }`;

  span.className = "toast-msg";
  span.textContent = msg;
  div.appendChild(span);

  if (document.querySelector(".toast")) {
    document.body.removeChild(document.querySelector(".toast"));
    document.body.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  setTimeout(() => {
    try {
      document.body.removeChild(div);
    } catch (error) {
      console.log(error);
    }
  }, 3000);
};
