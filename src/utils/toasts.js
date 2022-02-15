import toast from "react-hot-toast";

export const invalidNameToast = () => {
  toast.error(
    "Name should be at least 3 characters long and cannot contain a number or any special character",
    {
      duration: 5000,
      style: {
        marginTop: "3rem",
        marginRight: "1rem",
        borderRadius: "10px",
        background: "rgb(254 202 202)",
        color: "#b91c1c",
        fontWeight: "bold",
      },
    }
  );
};

export const invalidUsernameToast = () => {
  toast.error(
    "Username should be at least 3 characters long and cannot contain any special character except _",
    {
      duration: 5000,
      style: {
        marginTop: "3rem",
        marginRight: "1rem",
        borderRadius: "10px",
        background: "rgb(254 202 202)",
        color: "#b91c1c",
        fontWeight: "bold",
      },
    }
  );
};

export const invalidEmailToast = () => {
  toast.error("Invalid email", {
    style: {
      marginTop: "3rem",
      marginRight: "3rem",
      padding: "20px",
      borderRadius: "10px",
      background: "rgb(254 202 202)",
      color: "#b91c1c",
      fontWeight: "bold",
    },
  });
};

export const invalidPasswordToast = () => {
  toast.error(
    "Password should contain at least one lowercase letter, one uppercase letter, one number, one special character and should be at least 8 characters long",
    {
      duration: 8000,
      style: {
        marginTop: "3rem",
        marginRight: "1rem",
        borderRadius: "10px",
        background: "rgb(254 202 202)",
        color: "#b91c1c",
        fontWeight: "bold",
      },
    }
  );
};

export const invalidCredentialsToast = () => {
  toast.error("Invalid credentials", {
    duration: 3000,
    style: {
      marginTop: "2rem",
      marginRight: "1rem",
      borderRadius: "10px",
      background: "rgb(254 202 202)",
      color: "#b91c1c",
      fontWeight: "bold",
    },
  });
};

export const invalidCredentialsSignupToast = () => {
  toast.error("Username or email already exists. Try logging in instead.", {
    duration: 3000,
    style: {
      marginTop: "3rem",
      marginRight: "1rem",
      borderRadius: "10px",
      background: "rgb(254 202 202)",
      color: "#b91c1c",
      fontWeight: "bold",
    },
  });
};
