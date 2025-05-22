import { atom } from "recoil";

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const selectedUserIdState = atom({
  key: "selectedUserIdState",
  default: null,
});

export const selectedUserIndexState = atom({
  key: "selectedUserIndex",
  default: null,
});

export const presenceState = atom({
  key: "presenceState",
  default: null,
});
