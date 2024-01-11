import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  datetime: string;
  message: string;
}

interface mainLayoutState {
  notifications: Notification[];
  isOpenProfile: boolean;
  isOpenNotifications: boolean;
  isShowSidebar: boolean;
  openButton: string | null;
  isShowModal: boolean;
}

const initialState: mainLayoutState = {
  notifications: [],
  isOpenProfile: false,
  isOpenNotifications: false,
  isShowSidebar: false,
  openButton: null,
  isShowModal: false,
};

const mainLayoutSlice = createSlice({
  name: "mainLayout",
  initialState,
  reducers: {
    setOpenButton: (state, action: PayloadAction<string | null>) => {
      state.openButton = action.payload;
    },
    toogleSidebar: (state) => {
      state.isShowSidebar = !state.isShowSidebar;
    },
    toggleProfile: (state) => {
      state.isOpenProfile = !state.isOpenProfile;
    },
    toggleNotifications: (state) => {
      state.isOpenNotifications = !state.isOpenNotifications;
    },
    toggleModal: (state) => {
      state.isShowModal = !state.isShowModal;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
  },
});

export const {
  setOpenButton,
  toogleSidebar,
  toggleProfile,
  toggleNotifications,
  toggleModal,
  addNotification,
} = mainLayoutSlice.actions;
export default mainLayoutSlice.reducer;
