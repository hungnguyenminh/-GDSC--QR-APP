import {showMessage} from "react-native-flash-message";

const showError = (message: string): void => {
  showMessage({
    type: "danger",
    icon: "danger",
    message,
    statusBarHeight: 10,
  });
};

const showSuccess = (message: string): void => {
  showMessage({
    type: "success",
    icon: "success",
    message,
    statusBarHeight: 10,
  });
};
const showWarning = (message: string): void => {
  showMessage({
    type: "warning",
    icon: "warning",
    message,
    statusBarHeight: 10,
  });
};
export {showError, showSuccess, showWarning};
